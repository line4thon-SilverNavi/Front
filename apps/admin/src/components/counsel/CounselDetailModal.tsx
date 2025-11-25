import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import * as S from "@components/program/AddProgramModal/modal.styles";
import RequestModalShell from "@components/request/RequestModalShell";
import toast from "react-hot-toast";
import { formatKDateTimeFull } from "@core/hooks/ProcessingTime";
import { Button, ButtonLayout } from "@core/ui/button";

import {
  DetailInfoField,
  DetailInfoFieldGrid,
} from "@components/common/detail/DetailInfoFields";

import {
  getConsultDetail,
  type ConsultDetail,
  type ConsultCategory,
  type ConsultStatus,
} from "@apis/consult/getConsultDetail";
import { fmtPhone } from "@hooks/useFmtPhone";
import {
  patchConsultReply,
  type ConfirmedTime,
  type ConsultStatusForPatch,
} from "@apis/consult/patchConsultReply";

import ConsultReplyField, { type ConsultReplyValue } from "./CounselReplyField";
import TextAreaContainer from "@core/components/TextAreaContainer";
import { postConsultReply } from "@apis/consult/postReply";
import ConsultStatusField from "./ConsultStatusField";
import { STATUS_STYLE_MAP } from "@components/common/status/statusMap";

type Props = {
  open: boolean;
  consultId: number | null;
  category: ConsultCategory | null;
  onClose: () => void;
  onStatusChange?: (id: number, s: ConsultStatus) => void;
};

export default function ConsultDetailModal({
  open,
  consultId,
  category,
  onClose,
  onStatusChange,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ConsultDetail | null>(null);

  // 상담 확정 일시(날짜 + 시간대)
  const [reply, setReply] = useState<ConsultReplyValue>({
    confirmedDate: "",
    confirmedTime: "",
    status: "대기중",
  });
  const [initialReply, setInitialReply] = useState<ConsultReplyValue | null>(
    null
  );

  // 상태 전환
  const [statusToChange, setStatusToChange] =
    useState<ConsultStatusForPatch>("대기중");

  // 답변 및 거부 사유
  const [description, setDescription] = useState("");
  const [_, setInitialDescription] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !consultId || !category) return;
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getConsultDetail(consultId, category);
        if (!alive) return;
        setDetail(data);

        // 확정 날짜, 시간
        const baseDate = data.confirmedDate ?? data.hopeDate ?? "";
        const baseTime =
          (data.confirmedTime as ConfirmedTime | null) ??
          ("" as ConfirmedTime | "");

        const baseStatus: ConsultStatusForPatch =
          (data.consultStatus as ConsultStatusForPatch) ??
          ((data.status as ConsultStatusForPatch) || "대기중");

        const initial: ConsultReplyValue = {
          confirmedDate: baseDate,
          confirmedTime: baseTime,
          status: baseStatus,
        };

        setReply(initial);
        setInitialReply(initial);
        const baseReply = data.reply ?? "";
        setDescription(baseReply);
        setInitialDescription(baseReply);

        setStatusToChange(baseStatus);
      } catch (e: any) {
        toast.error(e?.message || "상담 상세 정보를 불러오지 못했습니다.");
        onClose();
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [open, consultId, category, onClose]);

  if (!open) return null;

  if (!detail) {
    return (
      <RequestModalShell open={open} onClose={onClose}>
        <S.Header>
          <S.H2>상담 상세 정보</S.H2>
          <S.Close onClick={onClose} src="/img/close.svg" />
        </S.Header>
        <S.Content aria-busy="true">
          <p>불러오는 중</p>
        </S.Content>
      </RequestModalShell>
    );
  }

  const {
    consultCategory,
    status,
    appliedAt,
    name,
    phone,
    birthDate,
    age,
    grade,
    careName,
    carePhone,
    hopeDate,
    hopeTime,
    consultType,
    inquiryContent,
  } = detail;

  const isSelf = !careName && !carePhone;
  const hopeDateTime =
    hopeDate && hopeTime ? `${hopeDate} ${hopeTime}` : (hopeDate ?? "");

  const isCompleted = status === "완료";

  /* ---------- PATCH + POST ---------- */

  const runSave = async (nextStatus: ConsultStatusForPatch) => {
    if (isCompleted) return;
    if (!consultId || !category) {
      toast.error("상담 정보를 찾을 수 없습니다.");
      return;
    }

    const trimmedDesc = description.trim();
    const isReject = nextStatus === "거부";

    // 거부일 때: 사유 필수
    if (isReject) {
      if (!trimmedDesc) {
        toast.error("거부 사유를 작성해주세요.");
        return;
      }
    } else {
      // 거부가 아닐 때: 확정 일시 필수
      if (!reply.confirmedDate || !reply.confirmedTime) {
        toast.error("상담 확정 일시를 입력해주세요.");
        return;
      }
    }

    const hasReplyChanged =
      !!initialReply &&
      (initialReply.confirmedDate !== reply.confirmedDate ||
        initialReply.confirmedTime !== reply.confirmedTime ||
        initialReply.status !== reply.status);

    const hasDescription = trimmedDesc.length > 0;

    // 거부도 아니고, 답변도 없고, 일시/상태도 안 바뀐 경우
    if (!isReject && !hasReplyChanged && !hasDescription) {
      toast("변경된 내용이 없습니다.");
      return;
    }

    const baseDate = reply.confirmedDate || hopeDate || appliedAt.slice(0, 10);
    const timeForPatch = reply.confirmedTime || ("오전" as ConfirmedTime);

    try {
      setSaving(true);

      if (isReject) {
        // 1) 거부: 무조건 POST (status, content, category, consultId만)
        await postConsultReply({
          consultId,
          category,
          content: trimmedDesc,
          consultStatus: "거부",
        });
      } else if (hasDescription) {
        // 2) 답변이 있을 때: 무조건 POST
        //    -> status는 "완료"로 보내기로 스펙 정의
        await postConsultReply({
          consultId,
          category,
          content: trimmedDesc,
          consultStatus: "완료",
          confirmedDate: baseDate,
          confirmedTime: timeForPatch,
        });
      } else {
        // 3) 답변 없고 거부도 아니고, 일시/상태만 변경 -> PATCH
        await patchConsultReply(consultId, category, {
          confirmedDate: baseDate,
          confirmedTime: timeForPatch,
          consultStatus: nextStatus,
        });
      }

      // 리스트 상태는 여기서 바로 반영
      if (isReject) {
        toast.success("상담이 거부 처리되었습니다.");
        onStatusChange?.(consultId, "거부");
      } else if (hasDescription) {
        // 답변을 작성했다면 화면에서도 완료로 표시
        toast.success("상담 답변이 저장되었습니다.");
        onStatusChange?.(consultId, "완료");
      } else {
        toast.success("상담 정보가 저장되었습니다.");
        onStatusChange?.(consultId, nextStatus as ConsultStatus);
      }

      onClose();
    } catch (e: any) {
      toast.error(e?.message || "상담 정보 저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // 승인 버튼
  const handleApprove = async () => {
    await runSave(statusToChange);
  };

  // 거부 버튼
  const handleReject = async () => {
    await runSave("거부");
  };

  return (
    <RequestModalShell open={open} onClose={onClose}>
      <StickyHeader>
        <div>
          <HeaderMeta>
            <S.H2>상담 상세 정보</S.H2>
            <CategoryBadge>{consultCategory}</CategoryBadge>
            <StatusBadge $status={status}>{status}</StatusBadge>
          </HeaderMeta>
          <span className="time">{formatKDateTimeFull(appliedAt)} 신청</span>
        </div>
        <S.Close onClick={onClose} src="/img/close.svg" />
      </StickyHeader>

      <ScrollArea>
        <S.DetailContent aria-busy={loading}>
          {/* 신청자 정보 */}
          <SectionTitle>신청자 정보</SectionTitle>
          <DetailInfoFieldGrid>
            <DetailInfoField
              iconSrc="/img/request/user.svg"
              label="이름"
              value={name}
            />
            <DetailInfoField
              iconSrc="/img/request/phone.svg"
              label="연락처"
              value={fmtPhone(phone)}
            />
            <DetailInfoField
              iconSrc="/img/request/calendar.svg"
              label="생년월일"
              value={`${birthDate} (${age}세)`}
            />
            <DetailInfoField
              iconSrc="/img/request/star.svg"
              valueColor="#409EE3"
              label="요양등급"
              value={grade}
            />
            {!isSelf && careName && (
              <>
                <DetailInfoField
                  iconSrc="/img/request/user.svg"
                  label="보호자 이름"
                  value={careName}
                />
                <DetailInfoField
                  iconSrc="/img/request/phone.svg"
                  label="보호자 연락처"
                  value={fmtPhone(carePhone ?? "")}
                />
              </>
            )}
          </DetailInfoFieldGrid>

          {/* 상담 정보 */}
          <SectionTitle style={{ marginTop: 30 }}>상담 정보</SectionTitle>
          <DetailInfoFieldGrid>
            <DetailInfoField
              iconSrc="/img/request/calendar.svg"
              label="희망 상담 일시"
              value={hopeDateTime || "-"}
            />
            <DetailInfoField
              iconSrc="/img/request/type.svg"
              valueColor="#409EE3"
              label="문의 유형"
              value={
                consultType
                  ? `${consultCategory} - ${consultType}`
                  : `${consultCategory}`
              }
            />
          </DetailInfoFieldGrid>

          <FieldBlock style={{ marginTop: 25 }}>
            <FieldLabel>문의 내용</FieldLabel>
            <p>{inquiryContent || "문의 내용이 없습니다."}</p>
          </FieldBlock>

          {/* 문의 답변 / 확정 일시 / 상태 전환 */}
          <SectionTitle style={{ marginTop: 30 }}>문의 답변</SectionTitle>

          <DetailInfoFieldGrid>
            <ConsultReplyField
              value={reply}
              onChange={setReply}
              readOnly={isCompleted}
            />

            <ConsultStatusField
              value={reply.status}
              readOnly={isCompleted}
              onChange={(next) => {
                setReply((prev) => ({
                  ...prev,
                  status: next,
                }));
                setStatusToChange(next);
              }}
            />
          </DetailInfoFieldGrid>

          <div style={{ marginTop: 24 }}>
            <TextAreaContainer
              label="답변 및 거부 사유"
              placeholder="답변 혹은 거부 사유를 작성해주세요."
              value={description}
              onChange={setDescription}
              labelTypo="heading3"
              textareaTypo="body2"
              placeholderTypo="body2"
              labelColor="#1A1A1A"
              placeholderColor="#A8A8A8"
              readOnly={isCompleted}
              readOnlyEmptyText="작성되지 않았습니다."
            />
          </div>
        </S.DetailContent>
      </ScrollArea>

      {!isCompleted && (
        <S.BtnBar>
          <ButtonLayout type="row" gap={12}>
            <Button
              tone="red"
              variant="outline"
              size="lg"
              typo="heading3"
              onClick={handleReject}
              disabled={saving}
              leftIcon={
                <img src="/img/request/deny.svg" width={20} height={20} />
              }
            >
              거부
            </Button>
            <Button
              size="lg"
              typo="heading3"
              onClick={handleApprove}
              disabled={saving}
              leftIcon={
                <img
                  src="/img/request/approve-white.svg"
                  width={20}
                  height={20}
                />
              }
            >
              승인
            </Button>
          </ButtonLayout>
        </S.BtnBar>
      )}
    </RequestModalShell>
  );
}

const SectionTitle = styled.h3`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray07};
  margin-bottom: 8px;
`;

const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${({ theme }) => theme.colors.gray02};
  ${({ theme }) => theme.fonts.label2};
  padding: 16px;
  border-radius: 10px;
  gap: 8px;

  p {
    color: ${({ theme }) => theme.colors.gray07};
    ${({ theme }) => theme.fonts.body2};
  }
`;

const FieldLabel = styled.h1`
  ${({ theme }) => theme.fonts.label2};
  color: ${({ theme }) => theme.colors.gray05};
`;

const ScrollArea = styled.div`
  max-height: 70vh;
  overflow-y: auto;
`;

const StickyHeader = styled(S.Header)`
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .time {
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray06};
  }
`;

const HeaderMeta = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryBadge = styled.span`
  padding: 5px 10px;
  border-radius: 25100200px;
  ${({ theme }) => theme.fonts.title3};
  background: ${({ theme }) => theme.colors.blue03};
  color: ${({ theme }) => theme.colors.blue01};
`;

const StatusBadge = styled.span<{ $status: ConsultStatus }>`
  padding: 5px 10px;
  border-radius: 25100200px;
  ${({ theme }) => theme.fonts.title3};

  ${({ $status }) => {
    const s = STATUS_STYLE_MAP[$status];
    return css`
      color: ${s.color};
      background: ${s.bg};
    `;
  }}
`;

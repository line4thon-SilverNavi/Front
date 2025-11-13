import { useEffect, useState } from "react";
import styled from "styled-components";
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
import type { ConsultReplyValue } from "./CounselReplyField";
import ConsultReplyField from "./CounselReplyField";
import ConsultStatusField from "./ConsultStatusField";

type Props = {
  open: boolean;
  consultId: number | null;
  category: ConsultCategory | null;
  onClose: () => void;
  onStatusChange?: (s: ConsultStatus) => void;
};

export default function ConsultDetailModal({
  open,
  consultId,
  category,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ConsultDetail | null>(null);
  const [saving, setSaving] = useState(false);
  const [reply, setReply] = useState<ConsultReplyValue>({
    confirmedDate: "",
    confirmedTime: "",
    status: "대기중",
  });

  useEffect(() => {
    if (!detail) return;

    const baseDate = detail.hopeDate ?? "";
    const baseTime = (detail.hopeTime as ConfirmedTime | null) ?? "";

    setReply({
      confirmedDate: baseDate,
      confirmedTime: baseTime,
      status: detail.status,
    });
  }, [detail]);

  useEffect(() => {
    if (!open || !consultId || !category) return;
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getConsultDetail(consultId, category);
        if (!alive) return;
        setDetail(data);
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
    // inquiryType,
    inquiryContent,
  } = detail;

  const isSelf = !careName && !carePhone;
  const hopeDateTime =
    hopeDate && hopeTime ? `${hopeDate} ${hopeTime}` : (hopeDate ?? "");

  const handleSaveReply = async () => {
    if (!consultId || !category) {
      toast.error("상담 정보를 찾을 수 없습니다.");
      return;
    }

    const { confirmedDate, confirmedTime, status } = reply;

    if (!confirmedDate || !confirmedTime) {
      toast.error("상담 확정 일시를 입력해주세요.");
      return;
    }

    try {
      setSaving(true);
      await patchConsultReply(consultId, category, {
        confirmedDate,
        confirmedTime: confirmedTime as ConfirmedTime,
        consultStatus: status as ConsultStatusForPatch,
      });
      toast.success("상담 답변이 저장되었습니다.");
      onClose();
    } catch (e: any) {
      toast.error(e?.message || "상담 답변 저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <RequestModalShell open={open} onClose={onClose}>
      <StickyHeader>
        <div>
          <HeaderMeta>
            <S.H2>상담 상세 정보</S.H2>
            <CategoryBadge>{consultCategory}</CategoryBadge>
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

          <SectionTitle style={{ marginTop: 30 }}>문의 답변</SectionTitle>

          <DetailInfoFieldGrid>
            <ConsultReplyField value={reply} onChange={setReply} />

            {/* 상태 전환 */}
            <ConsultStatusField
              value={reply.status}
              onChange={(next) =>
                setReply((prev) => ({
                  ...prev,
                  status: next,
                }))
              }
            />
          </DetailInfoFieldGrid>
        </S.DetailContent>
      </ScrollArea>

      <S.BtnBar>
        <ButtonLayout type="row" gap={12}>
          <Button
            tone="red"
            variant="outline"
            size="lg"
            typo="heading3"
            // onClick={handleReject}
            leftIcon={
              <img src="/img/request/deny.svg" width={20} height={20} />
            }
          >
            거부
          </Button>
          <Button
            size="lg"
            typo="heading3"
            onClick={handleSaveReply}
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

const FieldLabel = styled.p`
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

  span {
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray05};
  }
`;

const CategoryBadge = styled.span`
  padding: 2px 10px;
  border-radius: 999px;
  ${({ theme }) => theme.fonts.caption};
  background: ${({ theme }) => theme.colors.gray02};
  color: ${({ theme }) => theme.colors.gray06};
`;

const ReplyField = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray01};
`;

const LeftIcon = styled.img`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

const StatusSelectWrapper = styled.div`
  position: relative;
  width: 160px;
  margin-top: 6px;
`;

const StatusButton = styled.button`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray03};
  background: ${({ theme }) => theme.colors.gray02};
  padding: 10px 12px;
  text-align: left;
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray07};
`;

import { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "@components/program/AddProgramModal/modal.styles";
import { Button, ButtonLayout } from "@core/ui/button";
import toast from "react-hot-toast";

import {
  getCounselDetail,
  type CounselDetail,
} from "@apis/counsel/getCounselDetail";
import {
  CounselStatusBadge,
  type CounselStatus,
} from "@components/CounselStatusBadge";

type Props = {
  open: boolean;
  counselId: number | null;
  onClose: () => void;
  onStatusChange?: (s: CounselStatus) => void;
};

const fmtPhone = (raw: string | null | undefined) => {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("02"))
    return digits.replace(/(02)(\d{3,4})(\d{4})/, "$1-$2-$3");
  return digits.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
};

const fmtDateTime = (iso: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yy}-${mm}-${dd} ${hh}:${mi}`;
};

export default function CounselDetailModal({
  open,
  counselId,
  onClose,
  onStatusChange,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<CounselDetail | null>(null);

  useEffect(() => {
    if (!open || !counselId) return;
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getCounselDetail(counselId);
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
  }, [open, counselId, onClose]);

  if (!open) return null;

  if (!detail) {
    return (
      <S.Backdrop role="dialog" aria-modal="true" onClick={onClose}>
        <S.Sheet onClick={(e) => e.stopPropagation()}>
          <S.Header>
            <S.H2>상담 상세 정보</S.H2>
            <S.Close onClick={onClose} src="/img/close.svg" />
          </S.Header>
          <S.Content aria-busy="true">
            <p>불러오는 중</p>
          </S.Content>
        </S.Sheet>
      </S.Backdrop>
    );
  }

  const {
    appliedAt,
    counselType,
    status,
    applicantName,
    applicantPhone,
    birth,
    age,
    careGrade,
    careName,
    carePhone,
    hopeDate,
    questionType,
    content,
    fixedDate,
    statusChangeLabel,
  } = detail;

  const isSelf = !careName && !carePhone;

  const handleReject = () => {
    // TODO: 거부 API 연동
    onStatusChange?.("거부");
    toast.success("상담이 거부 처리되었습니다. (더미)");
    onClose();
  };

  const handleApprove = () => {
    // TODO: 승인/확인 API 연동
    onStatusChange?.("확인됨");
    toast.success("상담이 승인(확인) 처리되었습니다. (더미)");
    onClose();
  };

  return (
    <S.Backdrop role="dialog" aria-modal="true" onClick={onClose}>
      <S.Sheet onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.H2>상담 상세 정보</S.H2>
          <S.Close onClick={onClose} src="/img/close.svg" />
        </S.Header>

        <S.Content aria-busy={loading}>
          {/* 상단 요약 영역 (상단 타이틀 줄) */}
          <TopSummary>
            <TopRow1>
              <ApplyDate>{fmtDateTime(appliedAt)}</ApplyDate>
              <TypeTag>{counselType}</TypeTag>
              <StatusTop>
                <CounselStatusBadge status={status} />
              </StatusTop>
            </TopRow1>
          </TopSummary>

          {/* 신청자 정보 */}
          <Section>
            <SectionTitle>신청자 정보</SectionTitle>

            <TwoCol>
              <FieldBox>
                <Label>이름</Label>
                <Value>{applicantName}</Value>
              </FieldBox>
              <FieldBox>
                <Label>연락처</Label>
                <Value>{fmtPhone(applicantPhone)}</Value>
              </FieldBox>
            </TwoCol>

            <TwoCol>
              <FieldBox>
                <Label>생년월일</Label>
                <Value>
                  {birth} ({age}세)
                </Value>
              </FieldBox>
              <FieldBox>
                <Label>요양등급</Label>
                <Value>{careGrade}</Value>
              </FieldBox>
            </TwoCol>

            {!isSelf && (
              <TwoCol>
                <FieldBox>
                  <Label>보호자 이름</Label>
                  <Value>{careName}</Value>
                </FieldBox>
                <FieldBox>
                  <Label>보호자 연락처</Label>
                  <Value>{fmtPhone(carePhone)}</Value>
                </FieldBox>
              </TwoCol>
            )}
          </Section>

          {/* 상담 정보 */}
          <Section>
            <SectionTitle>상담 정보</SectionTitle>

            <TwoCol>
              <FieldBox>
                <Label>희망 상담 일시</Label>
                <Value>{hopeDate}</Value>
              </FieldBox>
              <FieldBox>
                <Label>문의유형</Label>
                <Value>{questionType}</Value>
              </FieldBox>
            </TwoCol>

            <FieldBox full>
              <Label>문의 내용</Label>
              <TextAreaReadOnly>{content || "없음"}</TextAreaReadOnly>
            </FieldBox>
          </Section>

          {/* 문의 답변 */}
          <Section>
            <SectionTitle>문의 답변</SectionTitle>

            <TwoCol>
              <FieldBox>
                <Label>상담 확정 일시</Label>
                <Value>{fixedDate || "미정"}</Value>
              </FieldBox>
              <FieldBox>
                <Label>상태전환</Label>
                <Value>{statusChangeLabel || "—"}</Value>
              </FieldBox>
            </TwoCol>
          </Section>
        </S.Content>

        <S.BtnBar>
          <ButtonLayout type="row" gap={12}>
            <Button
              tone="gray"
              variant="outline"
              size="lg"
              typo="heading2"
              onClick={handleReject}
            >
              거부
            </Button>
            <Button size="lg" typo="heading2" onClick={handleApprove}>
              승인
            </Button>
          </ButtonLayout>
        </S.BtnBar>
      </S.Sheet>
    </S.Backdrop>
  );
}

/* ---------- styled ---------- */

const TopSummary = styled.div`
  margin-bottom: 24px;
`;

const TopRow1 = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ApplyDate = styled.span`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray05};
`;

const TypeTag = styled.span`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.blue01};
`;

const StatusTop = styled.div`
  margin-left: auto;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  ${({ theme }) => theme.fonts.title2};
  color: ${({ theme }) => theme.colors.gray07};
  margin-bottom: 12px;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 16px;
  margin-bottom: 8px;
`;

const FieldBox = styled.div<{ full?: boolean }>`
  grid-column: ${({ full }) => (full ? "1 / -1" : "auto")};
  padding: 12px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray01};
`;

const Label = styled.div`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.gray05};
  margin-bottom: 4px;
`;

const Value = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray07};
`;

const TextAreaReadOnly = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray07};
  white-space: pre-wrap;
  min-height: 60px;
`;

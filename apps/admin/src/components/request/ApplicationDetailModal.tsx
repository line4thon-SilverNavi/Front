import { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "@components/program/AddProgramModal/modal.styles";
import { Button, ButtonLayout } from "@core/ui/button";
import {
  getApplicationDetail,
  type ApplicationDetail,
  type ApplicationStatus,
} from "@apis/request/getApplicationDetail";
import toast from "react-hot-toast";
import {
  DetailInfoField,
  DetailInfoFieldGrid,
} from "@components/common/detail/DetailInfoFields";
import { DetailHeaderCard } from "@components/common/detail/DetailHeaderCard";
import StatusTag from "./StatusTag";

type Props = {
  open: boolean;
  applicationId: number | null;
  onClose: () => void;
  onStatusChange?: (s: ApplicationStatus) => void;
};

const fmtPhone = (raw: string) => {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("02")) {
    return digits.replace(/(02)(\d{3,4})(\d{4})/, "$1-$2-$3");
  }
  return digits.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
};

export default function ApplicationDetailModal({
  open,
  applicationId,
  onClose,
  onStatusChange,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ApplicationDetail | null>(null);

  useEffect(() => {
    if (!open || !applicationId) return;
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getApplicationDetail(applicationId);
        if (!alive) return;
        setDetail(data);
      } catch (e: any) {
        toast.error(e?.message || "신청자 상세 정보를 불러오지 못했습니다.");
        onClose();
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [open, applicationId, onClose]);

  if (!open) return null;

  if (!detail) {
    return (
      <S.Backdrop role="dialog" aria-modal="true" onClick={onClose}>
        <S.Sheet onClick={(e) => e.stopPropagation()}>
          <S.Header>
            <S.H2>신청자 상세 정보</S.H2>
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
    programName,
    applicationDate,
    applicantName,
    applicantPhone,
    careName,
    carePhone,
    age,
    careGrade,
    content,
    status,
  } = detail;

  const isSelf = !careName && !carePhone;
  const isPending = status === "대기중";

  const handleReject = () => {
    // TODO: 거부 API 연동
    onStatusChange?.("거부");
    toast.success("거부 처리되었습니다. (더미)");
    onClose();
  };

  const handleApprove = () => {
    onStatusChange?.("승인");
    toast.success("승인 처리되었습니다. (더미)");
    onClose();
  };

  return (
    <S.Backdrop role="dialog" aria-modal="true" onClick={onClose}>
      <S.Sheet onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.H2>신청자 상세 정보</S.H2>
          <S.Close onClick={onClose} src="/img/close.svg" />
        </S.Header>

        <S.DetailContent aria-busy={loading}>
          <DetailHeaderCard
            title={programName}
            subtitle={`신청일: ${applicationDate.slice(0, 10)}`}
          />

          {/* 신청자 정보 */}
          <SectionTitle>신청자 정보</SectionTitle>
          <DetailInfoFieldGrid>
            <DetailInfoField
              iconSrc="/img/request/user.svg"
              label="이름"
              value={applicantName}
            />
            <DetailInfoField
              iconSrc="/img/request/phone.svg"
              label="연락처"
              value={fmtPhone(applicantPhone)}
            />
            <DetailInfoField
              iconSrc="/img/request/calendar.svg"
              label="나이"
              value={`${age}세`}
            />
            <DetailInfoField
              iconSrc="/img/request/calendar.svg"
              label="요양등급"
              value={careGrade}
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

          <Section style={{ marginTop: 24 }}>
            <SectionTitle>특이사항</SectionTitle>
            <TextAreaReadOnly>{content}</TextAreaReadOnly>
          </Section>
          <Section style={{ marginTop: 16 }}>
            <SectionTitle>현재 상태</SectionTitle>
            <StatusBox>
              <StatusTag status={status} />
            </StatusBox>
          </Section>
        </S.DetailContent>

        {isPending && (
          <S.BtnBar>
            <ButtonLayout type="row" gap={12}>
              <Button
                tone="red"
                variant="outline"
                size="lg"
                typo="heading3"
                onClick={handleReject}
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
      </S.Sheet>
    </S.Backdrop>
  );
}

const Section = styled.section`
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.gray01};
  padding: 15px;
  border-radius: 10px;
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  ${({ theme }) => theme.fonts.label2};
  color: ${({ theme }) => theme.colors.gray06};
`;

const StatusBox = styled.div`
  background: ${({ theme }) => theme.colors.gray01};
  border-radius: 10px;
  align-items: center;
`;

const TextAreaReadOnly = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray07};
  white-space: pre-wrap;
`;

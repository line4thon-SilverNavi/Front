import { useState } from "react";
import styled from "styled-components";
import * as S from "@components/program/AddProgramModal/modal.styles";
import { Button, ButtonLayout } from "@core/ui/button";
import toast from "react-hot-toast";

import { patchApplicationStatus } from "@apis/request/patchApplicationStatus";
import type { ApplicationStatus } from "@apis/request/getApplications";
import TextAreaContainer from "@core/components/TextAreaContainer";
import RequestModalShell from "@components/request/RequestModalShell";

type Props = {
  open: boolean;
  applicationId: number | null;
  applicantName: string;
  programName: string;
  onClose: () => void;
  onStatusChange?: (s: ApplicationStatus) => void;
};

const REASON_MAX = 500;

export default function RejectApplicationModal({
  open,
  applicationId,
  applicantName,
  programName,
  onClose,
  onStatusChange,
}: Props) {
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    const trimmed = reason.trim();
    if (!applicationId) return;

    if (!trimmed) {
      toast.error("거부 사유를 입력해주세요.");
      return;
    }

    try {
      setSaving(true);
      await patchApplicationStatus(applicationId, {
        isApproved: false,
        reason: trimmed,
      });

      toast.success("거부 사유가 신청자에게 전달되었습니다.");
      onStatusChange?.("거부");
      onClose();
    } catch (e: any) {
      toast.error(e?.message || "거부 처리 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <RequestModalShell open={open} onClose={onClose}>
      {/* 헤더 */}
      <RejectHeaderTop>
        <div className="rejectTop">
          <S.HeaderIcon src="/img/request/reject.svg" />
          <S.RejectHeaderContainer>
            <S.H2>신청 거부 사유 작성</S.H2>
            <p className="attendDes">
              신청자에게 전달될 거부 사유를 입력해주세요
            </p>
          </S.RejectHeaderContainer>
        </div>
        <S.Close src="/img/close.svg" onClick={onClose} />
      </RejectHeaderTop>

      <Content>
        {/* 상단 경고 영역 */}
        <AlertBox>
          <img src="/img/request/notice-red.svg" />
          <AlertText>
            명확하고 정중한 거부 사유를 작성해주세요. 신청자가 거부 사유를
            확인할 수 있습니다.
          </AlertText>
        </AlertBox>

        {/* 신청자 정보 */}
        <Section>
          <SectionTitle>신청자 정보</SectionTitle>
          <div className="infoContainer">
            <div className="item">
              <p className="label">신청자</p>
              <p className="value">{applicantName}</p>
            </div>
            <div className="item">
              <p className="label">프로그램</p>
              <p className="value">{programName}</p>
            </div>
          </div>
        </Section>

        {/* 거부 사유 입력 */}
        <Section style={{ marginTop: 24 }}>
          <TextAreaContainer
            label="거부 사유"
            required
            value={reason}
            onChange={setReason}
            placeholder="예: 정원이 초과되어 신청을 받을 수 없습니다."
            labelTypo="heading3"
            textareaTypo="body2"
            placeholderTypo="body2"
            labelColor="#1A1A1A"
            placeholderColor="#8F8F8F"
            helperText="신청자에게 거부 사유가 전달됩니다"
            maxLength={REASON_MAX}
          />
        </Section>
      </Content>

      {/* 하단 버튼 */}
      <S.BtnBar>
        <ButtonLayout type="row" gap={12}>
          <Button
            size="lg"
            tone="gray"
            variant="subtle"
            typo="heading3"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            size="lg"
            typo="heading3"
            tone="red"
            disabled={saving || !reason.trim()}
            onClick={handleSubmit}
          >
            거부 확인
          </Button>
        </ButtonLayout>
      </S.BtnBar>
    </RequestModalShell>
  );
}

/* ---------- 스타일 ---------- */

const Content = styled(S.Content)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`;

const AlertBox = styled.div`
  display: flex;
  gap: 15px;
  padding: 13px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.signal};
  background-color: #fef2f2;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

const AlertText = styled.p`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.alert};
  line-height: 1.5;
`;

export const RejectHeaderTop = styled.div`
  display: flex;
  padding: 30px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray04};
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;

  .rejectTop {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .infoContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: ${({ theme }) => theme.colors.gray02};
    padding: 19px;
    border-radius: 10px;
    gap: 10px;
  }

  .item {
    display: flex;
    justify-content: space-between;
  }

  .label {
    ${({ theme }) => theme.fonts.label2};
    color: ${({ theme }) => theme.colors.gray05};
  }

  .value {
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.gray07};
  }
`;

const SectionTitle = styled.h3`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray07};
`;

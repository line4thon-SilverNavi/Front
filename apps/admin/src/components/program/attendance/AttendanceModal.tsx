import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button, ButtonLayout } from "@core/ui/button";
import * as S from "../AddProgramModal/modal.styles";
import styled from "styled-components";

import {
  getProgramApplications,
  type ProgramApplicant,
} from "@apis/program/getApplication";
import ApplicantList from "./ApplicantList";

type Props = {
  open: boolean;
  programId: number | null;
  onClose: () => void;
  onSaved?: () => void;
};

export default function AttendanceModal({
  open,
  programId,
  onClose,
  onSaved,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [applicants, setApplicants] = useState<ProgramApplicant[]>([]);
  const [total, setTotal] = useState(0);
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    if (!open || !programId) return;
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const { summary, applicants } = await getProgramApplications(programId);
        if (!alive) return;
        setApplicants(applicants);
        setTotal(summary.totalApplicants);
      } catch (e: any) {
        toast.error(e?.message || "신청자 정보를 불러오지 못했습니다.");
        onClose();
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [open, programId, onClose]);

  const attendanceCount = useMemo(
    () => applicants.filter((a) => a.attendanceStatus === "출석").length,
    [applicants]
  );
  const attendanceRate = useMemo(() => {
    if (!total) return 0;
    return Math.round((attendanceCount / total) * 100);
  }, [attendanceCount, total]);

  if (!open) return null;

  // const setStatus = (id: number, status: AttendanceStatus) => {
  //   setApplicants((list) =>
  //     list.map((a) =>
  //       a.applicantId === id ? { ...a, attendanceStatus: status } : a
  //     )
  //   );
  // };

  const toggleAttend = (id: number) => {
    setApplicants((list) =>
      list.map((a) =>
        a.applicantId === id
          ? {
              ...a,
              attendanceStatus: a.attendanceStatus === "출석" ? "결석" : "출석",
            }
          : a
      )
    );
  };

  const checkAll = () => {
    setApplicants((list) =>
      list.map((a) => ({ ...a, attendanceStatus: "출석" as const }))
    );
  };

  const uncheckAll = () => {
    setApplicants((list) =>
      list.map((a) => ({ ...a, attendanceStatus: "결석" as const }))
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // 저장 API

      toast.success("출석 상태가 저장되었습니다. (로컬)");
      onSaved?.();
      onClose();
    } catch (e: any) {
      toast.error(e?.message || "저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <S.Backdrop role="dialog" aria-modal="true" onClick={onClose}>
      <S.Sheet onClick={(e) => e.stopPropagation()}>
        <S.HeaderWrapper>
          <S.HeaderTop>
            <S.HeaderContainer>
              <S.H2>건강체조 프로그램</S.H2>
              <p className="attendDes">신청자 관리 및 출석 체크</p>
            </S.HeaderContainer>
            <S.Close src="/img/close.svg" onClick={onClose} />
          </S.HeaderTop>

          {showNotice && (
            <S.NoticeWrapper>
              <S.NoticeContainer>
                <img src="/img/program/notice.svg" />
                <S.NoticeText>
                  <p>혹시 신청자 전부가 보이지 않는다면?</p>
                  <p className="noticeDes">
                    프로그램 신청 관리에서 승인되신 참가자 명단만 보여드립니다.
                    <br />
                    혹여나 아직 대기를 승인하지 않으셨다면{" "}
                    <span className="blue">"신청 관리"</span>에서 확인해보세요!
                  </p>
                </S.NoticeText>
              </S.NoticeContainer>
              <S.Close
                src="/img/program/blueClose.svg"
                onClick={() => setShowNotice(false)}
                className="blueClose"
              />
            </S.NoticeWrapper>
          )}
          <S.AttendancyCurrent>
            <SummaryBox label="총 참가자" value={`${total}명`} />
            <SummaryBox label="출석 인원" value={`${attendanceCount}명`} />
            <SummaryBox label="출석률" value={`${attendanceRate}%`} />
          </S.AttendancyCurrent>

          <ButtonLayout type="row" gap={12}>
            <Button onClick={checkAll} size="lg" typo="heading3">
              전체 출석 체크
            </Button>
            <Button
              tone="gray"
              variant="subtle"
              onClick={uncheckAll}
              size="lg"
              typo="heading3"
            >
              전체 출석 취소
            </Button>
          </ButtonLayout>
        </S.HeaderWrapper>

        <S.Content aria-busy={loading}>
          <ApplicantList items={applicants} onToggle={toggleAttend} />
        </S.Content>
      </S.Sheet>
    </S.Backdrop>
  );
}

/* ---------- small parts ---------- */
function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Box>
  );
}

const Box = styled.div`
  background: ${({ theme }) => theme.colors.gray02};
  border-radius: 12px;
  border-right: 0.993px solid ${({ theme }) => theme.colors.gray03};
  padding: 9px 0px;
`;

const Label = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray05};
`;

const Value = styled.div`
  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.gray07};
`;

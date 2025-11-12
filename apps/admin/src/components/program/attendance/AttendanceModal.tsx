// src/components/program/AttendanceModal.tsx
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button, ButtonLayout } from "@core/ui/button";
import * as S from "../AddProgramModal/modal.styles";
import styled, { useTheme } from "styled-components";

import {
  getProgramApplications,
  type AttendanceStatus,
  type ProgramApplicant,
} from "@apis/program/getApplication";
import ApplicantList from "./ApplicantList";

// 선택: 저장 API가 준비되면 주석 해제
// import { patchProgramAttendance } from "@apis/program/patchProgramAttendance";

type Props = {
  open: boolean;
  programId: number | null;
  onClose: () => void;
  onSaved?: () => void; // 저장 후 부모 리패치 등
};

const fmtPhone = (raw: string) => {
  // 01011112222 -> 010-1111-2222 / 0212341234 -> 02-1234-1234
  if (!raw) return "";
  if (raw.startsWith("02")) {
    return raw.replace(/(02)(\d{3,4})(\d{4})/, "$1-$2-$3");
  }
  return raw.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
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

  // 열릴 때마다 로드
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

  // 출석 수/율 계산 (로컬 상태 기준)
  const attendanceCount = useMemo(
    () => applicants.filter((a) => a.attendanceStatus === "출석").length,
    [applicants]
  );
  const attendanceRate = useMemo(() => {
    if (!total) return 0;
    return Math.round((attendanceCount / total) * 100);
  }, [attendanceCount, total]);

  if (!open) return null;

  const setStatus = (id: number, status: AttendanceStatus) => {
    setApplicants((list) =>
      list.map((a) =>
        a.applicantId === id ? { ...a, attendanceStatus: status } : a
      )
    );
  };

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
      // const items = applicants.map((a) => ({
      //   applicantId: a.applicantId,
      //   attendanceStatus: (a.attendanceStatus ?? "미출석") as "출석" | "미출석",
      // }));
      // await patchProgramAttendance(programId!, items);

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
              onClick={onClose}
              className="blueClose"
            />
          </S.NoticeWrapper>

          <S.AttendancyCurrent>
            <SummaryBox label="총 참가자" value={`${total}명`} />
            <SummaryBox label="출석 인원" value={`${attendanceCount}명`} />
            <SummaryBox label="출석률" value={`${attendanceRate}%`} />
          </S.AttendancyCurrent>

          <ButtonLayout type="row" gap={12}>
            <Button
              // onClick={handleAttend}
              size="lg"
              typo="heading3"
            >
              전체 출석 체크
            </Button>
            <Button
              tone="gray"
              variant="subtle"
              // onClick={handleNoAttend}
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

function ApplicantRow({
  item,
  onToggle,
}: {
  item: ProgramApplicant;
  onToggle: () => void;
  setStatus: (id: number, status: AttendanceStatus) => void;
}) {
  const { applicantId, name, gender, age, careName, phone, attendanceStatus } =
    item;
  const checked = attendanceStatus === "출석";

  return (
    <div
      role="listitem"
      style={{
        display: "grid",
        gridTemplateColumns: "36px 1fr auto",
        alignItems: "center",
        padding: "14px 16px",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        background: "#fff",
      }}
    >
      {/* 체크 원 */}
      <button
        aria-label={checked ? "출석 해제" : "출석 체크"}
        onClick={onToggle}
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: checked ? "6px solid #2563eb" : "2px solid #cbd5e1",
          background: "#fff",
        }}
      />

      {/* 본문 */}
      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontWeight: 700 }}>
          {name}{" "}
          <span style={{ color: "#64748b", fontWeight: 500 }}>
            ({gender === "male" ? "남" : "여"}, {age}세)
          </span>
        </div>
        {careName && (
          <div style={{ color: "#64748b", fontSize: 14 }}>
            👤 대리인: {careName}
          </div>
        )}
        <div style={{ color: "#64748b", fontSize: 14 }}>
          📞 {fmtPhone(phone)}
        </div>
      </div>

      {/* 상태 뱃지 (예시: 승인됨) */}
      <span
        style={{
          padding: "6px 10px",
          borderRadius: 999,
          background: "#e0f2fe",
          color: "#0369a1",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        승인됨
      </span>
    </div>
  );
}

/* ---------- local styles (간단 버튼) ---------- */
const btnPrimary: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};
const btnGhost: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  background: "#f1f5f9",
  color: "#64748b",
  fontWeight: 700,
  cursor: "pointer",
};

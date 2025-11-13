import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export type ConfirmedTime = "오전" | "오후" | "저녁";
export type ConsultStatusForPatch = "대기중" | "확인됨" | "완료" | "거부";

export type ConsultReplyValue = {
  confirmedDate: string;
  confirmedTime: ConfirmedTime | "";
  status: ConsultStatusForPatch;
};

type Props = {
  value: ConsultReplyValue;
  onChange: (next: ConsultReplyValue) => void;
  readOnly?: boolean;
};

const TIME_OPTIONS: ConfirmedTime[] = ["오전", "오후", "저녁"];

export default function ConsultReplyField({
  value,
  onChange,
  readOnly,
}: Props) {
  const [dateTimeOpen, setDateTimeOpen] = useState(false);
  const { confirmedDate, confirmedTime } = value;
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dateTimeOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setDateTimeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dateTimeOpen]);

  return (
    <Wrapper ref={wrapperRef}>
      <IconBox>
        <img src="/img/request/calendar.svg" alt="" />
      </IconBox>

      <Body>
        <p className="label">상담 확정 일시</p>

        <ConfirmWrapper>
          <ConfirmPill
            onClick={() => setDateTimeOpen(true)}
            $empty={!value.confirmedDate || !value.confirmedTime}
          >
            <span>
              {value.confirmedDate && value.confirmedTime
                ? `${value.confirmedDate} ${value.confirmedTime}`
                : "예: 2025-10-20 오전"}
            </span>
          </ConfirmPill>

          {!readOnly && dateTimeOpen && (
            <ConfirmEditor>
              <EditorRow>
                <span className="editor-label">확정 날짜</span>
                <DateInput
                  type="date"
                  value={confirmedDate}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      confirmedDate: e.target.value,
                    })
                  }
                />
              </EditorRow>

              <EditorRow>
                <span className="editor-label">확정 시간대</span>
                <TimeChips>
                  {TIME_OPTIONS.map((t) => (
                    <TimeChip
                      key={t}
                      type="button"
                      $active={confirmedTime === t}
                      onClick={() =>
                        onChange({
                          ...value,
                          confirmedTime: t,
                        })
                      }
                    >
                      {t}
                    </TimeChip>
                  ))}
                </TimeChips>
              </EditorRow>
            </ConfirmEditor>
          )}
        </ConfirmWrapper>
      </Body>
    </Wrapper>
  );
}

/* ---------- styles ---------- */

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const IconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray02};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .label {
    ${({ theme }) => theme.fonts.label2};
    color: ${({ theme }) => theme.colors.gray05};
  }
`;

export const ConfirmWrapper = styled.div`
  position: relative;
`;

export const ConfirmPill = styled.button<{ $empty?: boolean }>`
  width: 100%;
  padding: 11px 19px;
  text-align: left;
  border-radius: 12px;

  background: ${({ theme }) => theme.colors.gray02};
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme, $empty }) =>
    $empty ? theme.colors.gray04 : theme.colors.gray07};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ConfirmEditor = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 20;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray03};
  background: #fff;
  padding: 12px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EditorRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  .editor-label {
    width: 80px;
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray05};
    flex-shrink: 0;
  }
`;

const TimeChips = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const TimeChip = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.blue01 : theme.colors.gray03};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.blue03 : theme.colors.gray01};
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.blue01 : theme.colors.gray07};
  cursor: pointer;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.blue03 : theme.colors.gray02};
  }
`;

const DateInput = styled.input`
  flex: 1;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray03};
  background: ${({ theme }) => theme.colors.gray02};
  padding: 8px 10px;
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray07};
`;

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  open: boolean;
  start: string;
  end: string;
  onChangeStart: (v: string) => void;
  onChangeEnd: (v: string) => void;
  onConfirm: () => void;
  onClose: () => void;
};

const addMinutes = (hhmm: string, mins: number) => {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm);
  if (!m) return hhmm;
  let h = parseInt(m[1], 10);
  let mm = parseInt(m[2], 10);
  let total = h * 60 + mm + mins;
  if (total < 0) total = 0;
  if (total > 23 * 60 + 59) total = 23 * 60 + 59;
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
};

export default function TimeRangePickerModal({
  open,
  start,
  end,
  onChangeStart,
  onChangeEnd,
  onConfirm,
  onClose,
}: Props) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [localStart, setLocalStart] = useState(start);
  const [localEnd, setLocalEnd] = useState(end);

  useEffect(() => {
    if (!open) return;

    let nextStart = start;
    let nextEnd = end;

    //시간 선택 기본값 설정
    if (!nextStart) {
      nextStart = "10:00";
      onChangeStart(nextStart);
    }
    if (!nextEnd) {
      nextEnd = "11:00";
      onChangeEnd(nextEnd);
    }

    setLocalStart(nextStart);
    setLocalEnd(nextEnd);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const applyPreset = (mins: number) => {
    const nextEnd = addMinutes(localStart, mins);
    setLocalEnd(nextEnd);
    onChangeEnd(nextEnd);
  };

  const invalid = localEnd <= localStart;

  return (
    <Back onClick={onClose}>
      <Sheet ref={sheetRef} onClick={(e) => e.stopPropagation()}>
        <Title>시간 선택</Title>

        <Cols>
          <Col>
            <Label>시작</Label>
            <TimeInput
              type="time"
              step={60}
              value={localStart}
              onChange={(e) => {
                setLocalStart(e.target.value);
                onChangeStart(e.target.value);
              }}
              autoFocus
            />
          </Col>
          <Dash>~</Dash>
          <Col>
            <Label>종료</Label>
            <TimeInput
              type="time"
              step={60}
              value={localEnd}
              onChange={(e) => {
                setLocalEnd(e.target.value);
                onChangeEnd(e.target.value);
              }}
            />
          </Col>
        </Cols>

        <Presets>
          <span>빠른 설정</span>
          <Chips>
            <Chip onClick={() => applyPreset(30)}>+30분</Chip>
            <Chip onClick={() => applyPreset(60)}>+1시간</Chip>
            <Chip onClick={() => applyPreset(90)}>+1시간 30분</Chip>
          </Chips>
        </Presets>

        {invalid && <Warn>종료 시간은 시작 시간 이후여야 합니다.</Warn>}

        <Actions>
          <Btn type="button" data-variant="ghost" onClick={onClose}>
            취소
          </Btn>
          <Btn
            type="button"
            data-variant="primary"
            onClick={onConfirm}
            disabled={invalid}
          >
            확인
          </Btn>
        </Actions>
      </Sheet>
    </Back>
  );
}

/* ---------- styles ---------- */
const Back = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  z-index: 1000;
`;
const Sheet = styled.div`
  width: min(520px, 92vw);
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;
const Title = styled.h3`
  margin: 0 0 12px;
  font-weight: 700;
  font-size: 18px;
`;
const Cols = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 12px;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Label = styled.label`
  font-size: 14px;
  color: #555;
`;
const TimeInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f7f7f8;
  font-size: 16px;
`;
const Dash = styled.div`
  color: #888;
  padding: 0 2px 8px;
`;
const Presets = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #666;
`;
const Chips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const Chip = styled.button`
  border: 1px dashed #d1d5db;
  background: #f3f4f6;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
`;
const Warn = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.signal};
  font-size: 13px;
`;
const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
const Btn = styled.button`
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 600;
  &[data-variant="ghost"] {
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
  }
  &[data-variant="primary"] {
    background: ${({ theme }) => theme.colors.blue01};
    color: #fff;
    border: 0;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

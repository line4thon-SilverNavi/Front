import { useState } from "react";
import InputContainer from "@core/components/inputContainer";
import { useFormatTime } from "@core/hooks/ProcessingTime";
import TimeRangePickerModal from "./TimeRangePickerModal";

type Props = {
  startTime: string;
  endTime: string;
  onChangeStart: (v: string) => void;
  onChangeEnd: (v: string) => void;
  required?: boolean;
  label?: string;
  prefixIcon?: React.ReactNode;
  variant?: "underline" | "filled";
};

export default function TimeRangeField({
  startTime,
  endTime,
  onChangeStart,
  onChangeEnd,
  required,
  label = "시간",

  variant = "filled",
}: Props) {
  const [open, setOpen] = useState(false);
  const pretty = useFormatTime(startTime, endTime);

  return (
    <>
      <InputContainer
        label={label}
        required={required}
        value={pretty}
        onChange={() => {}}
        placeholder="예: 오전 10:00 - 11:30"
        variant={variant}
        clickable
        onClickInput={() => setOpen(true)}
        prefixIcon={<img src="/img/program/clock.svg" alt="" aria-hidden />}
        labelColor="#1A1A1A"
        labelTypo="heading3"
        inputTypo="body2"
      />

      <TimeRangePickerModal
        open={open}
        start={startTime}
        end={endTime}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        onConfirm={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

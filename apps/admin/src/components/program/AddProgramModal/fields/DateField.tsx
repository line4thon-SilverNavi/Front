import { useRef } from "react";
import styled from "styled-components";
import InputContainer from "@core/components/inputContainer";
import { formatKDate } from "@core/hooks/ProcessingTime";

type Props = {
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  label?: string;
};

export default function DateField({
  value,
  onChange,
  required,
  label = "일정",
}: Props) {
  const hiddenRef = useRef<HTMLInputElement | null>(null);
  const openPicker = () =>
    hiddenRef.current?.showPicker?.() ?? hiddenRef.current?.click();

  return (
    <Wrap>
      <InputContainer
        label={label}
        required={required}
        value={formatKDate(value)}
        onChange={() => {}}
        placeholder="예: 10월 16일(수)"
        variant="filled"
        clickable
        onClickInput={openPicker}
        prefixIcon={<img src="/img/program/date.svg" alt="" aria-hidden />}
        labelColor="#1A1A1A"
        labelTypo="heading3"
        inputTypo="body2"
      />
      <Hidden
        ref={hiddenRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        aria-hidden
      />
    </Wrap>
  );
}
const Wrap = styled.div`
  position: relative;
`;
const Hidden = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
`;

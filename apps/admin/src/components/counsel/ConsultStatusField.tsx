import { useRef, useState } from "react";
import CategoryDropdown from "@components/program/AddProgramModal/fields/CategoryModal";
import {
  Body,
  ConfirmPill,
  ConfirmWrapper,
  IconBox,
  Wrapper,
  type ConsultStatusForPatch,
} from "./CounselReplyField";

type Props = {
  value: ConsultStatusForPatch;
  onChange: (next: ConsultStatusForPatch) => void;
};

const STATUS_OPTIONS: ConsultStatusForPatch[] = ["대기중", "확인됨", "완료"];

export default function ConsultStatusField({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <Wrapper ref={wrapperRef}>
      <IconBox>
        <img src="/img/counsel/update.svg" alt="" />
      </IconBox>
      <Body>
        <p className="label">상태 전환</p>

        <ConfirmWrapper>
          <ConfirmPill type="button" onClick={() => setOpen((o) => !o)}>
            {value}
            <img
              src="/img/counsel/arrow-down.svg"
              style={{ cursor: "focus" }}
            />
          </ConfirmPill>

          <CategoryDropdown
            open={open}
            value={value}
            options={STATUS_OPTIONS as any}
            onSelect={(v: ConsultStatusForPatch) => {
              onChange(v);
              setOpen(false);
            }}
            onClose={() => setOpen(false)}
          />
        </ConfirmWrapper>
      </Body>
    </Wrapper>
  );
}

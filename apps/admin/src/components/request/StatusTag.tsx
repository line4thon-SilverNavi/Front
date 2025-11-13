import styled from "styled-components";
import {
  STATUS_STYLE_MAP,
  type StatusType,
} from "@components/common/status/statusMap";

type Props = {
  status: StatusType;
};

export default function StatusTag({ status }: Props) {
  const style = STATUS_STYLE_MAP[status];

  return (
    <Tag
      style={{
        background: style.bg,
        borderColor: style.border,
        color: style.color,
      }}
    >
      <Dot style={{ background: style.color }} />
      <span>{status}</span>
    </Tag>
  );
}

/* ---------- styled ---------- */

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 12px;
  border: 0.748px solid;
  ${({ theme }) => theme.fonts.heading3};
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

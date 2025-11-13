import {
  STATUS_STYLE_MAP,
  type StatusType,
} from "@components/common/status/statusMap";
import styled, { css } from "styled-components";

export type AppStatus = StatusType;

type Props = { status: AppStatus; className?: string };

export default function StatusBadge({ status, className }: Props) {
  const iconSrc =
    status === "승인" || "확인됨"
      ? "/img/request/approve.svg"
      : status === "대기중"
        ? "/img/request/waiting.svg"
        : "/img/request/deny.svg";

  return (
    <Badge
      className={className}
      $status={status}
      aria-label={`상태: ${status}`}
      title={status}
    >
      <Icon src={iconSrc} alt="" />
      {status}
    </Badge>
  );
}

const Badge = styled.span<{ $status: AppStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 16px;
  width: 80%;
  border-radius: 20px;

  ${({ theme }) => theme.fonts.body3};

  ${({ $status }) => {
    const s = STATUS_STYLE_MAP[$status];
    return css`
      color: ${s.color};
      background: ${s.bg};
    `;
  }}
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

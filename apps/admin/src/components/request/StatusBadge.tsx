import styled, { css } from "styled-components";

export type AppStatus = "대기중" | "승인" | "거부";

type Props = { status: AppStatus; className?: string };

export default function StatusBadge({ status, className }: Props) {
  const iconSrc =
    status === "승인"
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

/* ---------- styles ---------- */
const Badge = styled.span<{ $status: AppStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 16px;
  width: 80%;
  border-radius: 20px;
  ${({ theme }) => theme.fonts.body3};

  ${({ $status, theme }) => {
    switch ($status) {
      case "승인":
        return css`
          color: ${theme.colors.blue01};
          background: ${theme.colors.blue03};
        `;
      case "대기중":
        return css`
          color: #ff9500;
          background: #fefce8;
        `;
      case "거부":
        return css`
          color: ${theme.colors.alert};
          background: #fef2f2;
        `;
    }
  }}
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

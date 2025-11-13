import styled, { css } from "styled-components";

export type CounselStatus = "대기중" | "확인됨" | "완료" | "거부";

type Props = {
  status: CounselStatus;
  className?: string;
};

export default function CounselStatusBadge({ status, className }: Props) {
  const iconSrc =
    status === "확인됨"
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

const Badge = styled.span<{ $status: CounselStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 16px;
  border-radius: 20px;
  ${({ theme }) => theme.fonts.body3};
  width: 80%;

  ${({ $status, theme }) => {
    switch ($status) {
      case "확인됨":
        return css`
          color: ${theme.colors.blue01};
          background: ${theme.colors.blue03};
        `;
      case "대기중":
        return css`
          color: #ff9500;
          background: #fefce8;
        `;
      case "완료":
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

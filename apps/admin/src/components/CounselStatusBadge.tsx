import styled, { css } from "styled-components";

export type CounselStatus = "대기중" | "확인됨" | "완료" | "거부";

type Props = {
  status: CounselStatus;
};

export function CounselStatusBadge({ status }: Props) {
  return <Badge $s={status}>{status}</Badge>;
}

const Badge = styled.span<{ $s: CounselStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: 999px;
  ${({ theme }) => theme.fonts.body3};

  ${({ $s, theme }) => {
    switch ($s) {
      case "대기중":
        return css`
          background: #fff7e6;
          color: #f59e0b;
        `;
      case "확인됨":
      case "완료":
        return css`
          background: #e0f2fe;
          color: #0ea5e9;
        `;
      case "거부":
        return css`
          background: #fee2e2;
          color: #ef4444;
        `;
      default:
        return css`
          background: ${theme.colors.gray02};
          color: ${theme.colors.gray06};
        `;
    }
  }}
`;

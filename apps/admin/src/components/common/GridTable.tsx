import styled from "styled-components";

export const TableWrap = styled.div<{ $cols?: string }>`
  --cols: ${({ $cols }) => $cols || "1fr"};
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: var(--cols);
  align-items: center;
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.gray02};
  border-bottom: 0.636px solid ${({ theme }) => theme.colors.gray02};
`;

export const HCell = styled.div<{ $align?: "left" | "center" | "right" }>`
  ${({ theme }) => theme.fonts.title2};
  color: ${({ theme }) => theme.colors.gray06};
  text-align: ${({ $align }) => $align || "left"};
`;

export const Body = styled.div`
  display: grid;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: var(--cols);
  align-items: center;
  padding: 16px 20px;
  border-bottom: 0.636px solid ${({ theme }) => theme.colors.gray02};
  &:last-child {
    border-bottom: 0;
  }
`;

export const Cell = styled.div<{ $align?: "left" | "center" | "right" }>`
  min-width: 0;
  text-align: ${({ $align }) => $align || "left"};
`;

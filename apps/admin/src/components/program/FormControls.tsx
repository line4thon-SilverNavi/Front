import styled from "styled-components";

/** 재사용 가능한 폼 컨트롤 묶음 */

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  /* ${({ theme }) => theme.fonts.heading3} */
  color: #6b7280;
`;

export const Helper = styled.div`
  /* ${({ theme }) => theme.fonts.heading3} */
  color: #9aa0a6;
  margin-top: -2px;
`;

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

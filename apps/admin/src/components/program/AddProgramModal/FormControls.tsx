import styled from "styled-components";

/** 재사용 가능한 폼 컨트롤 묶음 */

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  padding-top: 11px;
  border-top: 0.993px solid ${({ theme }) => theme.colors.gray03};
  margin-top: 10px;
  ${({ theme }) => theme.fonts.heading2}
  color:  ${({ theme }) => theme.colors.blue01};
  display: flex;
  gap: 6px;

  img {
    width: 24px;
  }
`;

export const Helper = styled.div`
  ${({ theme }) => theme.fonts.heading3}
  color: ${({ theme }) => theme.colors.gray07};
  margin-top: 15px;
`;

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

import styled from "styled-components";

export const HomeWrapper = styled.div`
  color: ${({ theme }) => theme.colors.blue01};
  ${({ theme }) => theme.fonts.body1}
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => theme.fonts.title1};
  color: ${({ theme }) => theme.colors.gray07};
  margin-bottom: 1rem;
  margin-top: 2rem;

  &:first-child {
    margin-top: 0;
  }
`;

export const Facilities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Programs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

import styled from "styled-components";

export const HomeWrapper = styled.div`
  color: ${({ theme }) => theme.colors.blue01};
  ${({ theme }) => theme.fonts.body1}
`;

export const Facilities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

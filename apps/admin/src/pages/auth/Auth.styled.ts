import styled from "styled-components";

export const AuthTitle = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 20rem;
  }

  p {
    color: ${({ theme }) => theme.colors.gray04};
    font: ${({ theme }) => theme.fonts.heading2};
  }
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  gap: 4rem;
`;

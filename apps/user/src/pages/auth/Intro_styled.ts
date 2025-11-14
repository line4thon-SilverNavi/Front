import styled from "styled-components";

export const IntroWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

export const IntroTitleContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 7rem 0rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray07};
  gap: 12px;
  margin-top: 8rem;

  img {
    width: 325px;
    height: 77px;

    &.caption{
      width: 225px;
      height: 15px;
    }
  }
`;

export const IntroBtnContainer = styled.section`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: flex-end;
`;

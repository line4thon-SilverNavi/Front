import styled from "styled-components";

export const TopbarWrap = styled.header`
  box-sizing: border-box;
  grid-area: top;
  background-color: ${({ theme }) => theme.colors.gray01};
  border-bottom: 1.333px solid ${({ theme }) => theme.colors.gray03};
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 110px;
  padding: 20px 15px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  width: 70px;
  height: 70px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.blue01};
  color: ${({ theme }) => theme.colors.gray01};
`;

export const Burger = styled.button`
  --size: 36px;
  width: var(--size);
  height: var(--size);
  gap: 3px;
  cursor: pointer;

  img {
    width: 30px;
  }
`;

export const Title = styled.h1`
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray07};
`;

export const RightContainer = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray05};
  text-align: end;
`;

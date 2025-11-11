import styled from "styled-components";

export const Aside = styled.aside`
  grid-area: aside;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  width: 300px;
  z-index: 40;
  height: 100dvh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.gray01};
  &[data-floating="false"][data-open="false"] {
    transform: translateX(-100%);
  }
`;

export const AsideHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 33px 16px 25px;
  border-bottom: 0.748px solid ${({ theme }) => theme.colors.gray02};
  height: 110px;
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  .name {
    ${({ theme }) => theme.fonts.heading2}
    color: ${({ theme }) => theme.colors.blue01}
  }
  p {
    ${({ theme }) => theme.fonts.body3}
    color: ${({ theme }) => theme.colors.gray04}
  }
`;

export const CloseBtn = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray05};
  border-radius: 8px;
  padding: 2px 8px;
`;

export const Nav = styled.nav`
  display: grid;
  gap: 12px;
  padding: 12px 8px;
`;

export const PlanContainer = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray02};
  display: flex;
  padding: 26px 14px 26px 12px;
  align-items: center;
  justify-content: space-between;
  p {
    ${({ theme }) => theme.fonts.title3};
    color: ${({ theme }) => theme.colors.gray05};
  }
  .left {
    display: flex;
    align-items: center;
    gap: 8px;
    img {
      width: 18px;
    }
  }
`;

export const Upgrade = styled.div`
  display: flex;
  padding: 6px 18px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.blue01};
  color: ${({ theme }) => theme.colors.gray01};
  ${({ theme }) => theme.fonts.title3};
`;

export const NavBtn = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 23px 16px;
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray05};
  border-radius: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .icon {
    width: 20px;
    height: 20px;
    background-color: currentColor;
    mask: var(--icon) no-repeat center / contain;
    -webkit-mask: var(--icon) no-repeat center / contain;
    flex-shrink: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.gray02};
  }
  &[data-active="true"] {
    background: ${({ theme }) => theme.colors.blue01};
    color: ${({ theme }) => theme.colors.gray01};
    ${({ theme }) => theme.fonts.heading2};
  }
  .badge {
    background-color: ${({ theme }) => theme.colors.blue01};
    color: ${({ theme }) => theme.colors.gray01};
    ${({ theme }) => theme.fonts.title3};
    padding: 6px 11px;
    border-radius: 25100200px;
  }
  &[data-active="true"] .badge {
    background: ${({ theme }) => theme.colors.gray01};
    color: ${({ theme }) => theme.colors.blue01};
  }
`;

export const AsideFooter = styled.div`
  display: flex;
  padding: 35px 24px;
  ${({ theme }) => theme.fonts.body2};
  gap: 11.99px;
  cursor: pointer;
  img {
    width: 19.998px;
    height: 19.998px;
  }
`;

export const SmallLink = styled.button`
  appearance: none;
  border: 0;
  color: ${({ theme }) => theme.colors.signal};
  ${({ theme }) => theme.fonts.body2};
`;

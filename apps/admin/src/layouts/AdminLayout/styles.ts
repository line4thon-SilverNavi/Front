import styled from "styled-components";

export const Shell = styled.div`
  --aside-w: 300px;
  min-height: 100dvh;
  height: 100dvh;
  overflow: hidden;
  background: var(--bg);
  display: grid;
  grid-template:
    "top   top" auto
    "aside main" 1fr
    / 0 1fr;
  &[data-open="true"] {
    grid-template-columns: var(--aside-w) 1fr;
  }
`;

export const Main = styled.div`
  grid-area: main;
  min-width: 0;
  transition: transform 220ms ease;
  overflow: hidden;
  [data-open="true"] & {
    transform: translateX(var(--nudge));
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 2rem;
  .title {
    color: ${({ theme }) => theme.colors.gray07};
    font-size: 38px;
    font-style: normal;
    font-weight: 500;
    line-height: 46px;
  }
  .des {
    color: ${({ theme }) => theme.colors.gray05};
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
  }
`;

export const ContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 40px 31px;
  overflow: auto;
  padding: 16px clamp(12px, 2vw, 24px) 24px;
  min-width: 0;
  height: calc(100% - 110px);
  background: linear-gradient(180deg, #f2faff 0%, #fff 50%, #e6f4ff 100%);
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.38);
  z-index: 30;
`;

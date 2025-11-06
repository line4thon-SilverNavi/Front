import type { PropsWithChildren } from "react";
import styled from "styled-components";

type AuthLayoutProps = {
  title?: React.ReactNode;
};

export default function AuthLayout({
  title,
  children,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <AuthLayoutWrapper>
      {title && <TitleArea>{title}</TitleArea>}
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer>© 2025 실버나비. All rights reserved.</Footer>
    </AuthLayoutWrapper>
  );
}

const AuthLayoutWrapper = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding-inline: clamp(16px, 4vw, 48px);
  padding-block: clamp(16px, 5vh, 36px);
  padding-bottom: calc(
    clamp(16px, 5vh, 36px) + env(safe-area-inset-bottom, 0px)
  );
`;
const TitleArea = styled.div`
  width: 100%;
  max-width: 730px;
  margin: 0 auto clamp(8px, 2vh, 20px);
`;

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Footer = styled.span`
  ${({ theme }) => theme.fonts.title1};
  color: #b4b4bb;
  text-align: center;
  margin-top: auto;
  padding-top: clamp(12px, 2vh, 20px);
`;

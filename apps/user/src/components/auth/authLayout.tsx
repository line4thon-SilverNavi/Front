import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { PropsWithChildren } from "react";

type AuthLayoutProps = {
  title: string;
  onBack?: () => void;
  footer?: React.ReactNode; // 하단 버튼 등
};

export default function AuthLayout({
  title,
  onBack,
  footer,
  children,
}: PropsWithChildren<AuthLayoutProps>) {
  const navigate = useNavigate();
  const handleBack = () => (onBack ? onBack() : navigate(-1));

  return (
    <Wrap>
      <Header>
        <img src="/img/auth/back.png" onClick={handleBack} />
        <Title>{title}</Title>
      </Header>

      <Content role="main">{children}</Content>

      {footer && <Footer>{footer}</Footer>}
    </Wrap>
  );
}

/* styled */
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  height: 100svh;
  background: #fff;
  padding-bottom: env(safe-area-inset-bottom);
  padding: 1.36rem;
  gap: 2rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 18px;
    height: 18px;
  }
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading1};
  color: ${({ theme }) => theme.colors.gray07};
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
`;

const Footer = styled.footer`
  padding: 16px 0px calc(16px + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

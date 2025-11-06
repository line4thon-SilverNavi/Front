import type { PropsWithChildren } from "react";
import styled from "styled-components";

type AuthLayoutProps = {
  footer?: React.ReactNode;
};

export default function AuthLayout({
  children,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <AuthLayoutWrapper>
      {children}
      <Footer>© 2025 실버나비. All rights reserved.</Footer>
    </AuthLayoutWrapper>
  );
}

const AuthLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5.37rem 26.37rem;
  align-items: center;
`;

const Footer = styled.span`
  ${({ theme }) => theme.fonts.title1}
  color: #B4B4BB;
  position: fixed;
  bottom: 1rem;
`;

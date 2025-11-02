import styled from "styled-components";
import type { PropsWithChildren } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

export default function DefaultLayout({ children }: PropsWithChildren) {

  return (
    <Wrap>
      <Header />

      <Content role="main">{children}</Content>

      <NavBar />
    </Wrap>
  );
}

/* styled */
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100%;
  min-height: 100dvh; */
  background: #fff;
  padding: 1.36rem 1.36rem calc(1.36rem + env(safe-area-inset-bottom));
  gap: 1rem;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray01};;
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
`;


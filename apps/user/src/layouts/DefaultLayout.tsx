import styled from "styled-components";
import type { PropsWithChildren } from "react";

type DefaultLayoutProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const DefaultLayout = ({
  header,
  footer,
  children,
}: PropsWithChildren<DefaultLayoutProps>) => {
  return (
    <OutletWrapper>
      {header}
      <ContentWrapper>
        {children}
      </ContentWrapper>
      {footer}
    </OutletWrapper>
  );
};

export default DefaultLayout;

const OutletWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gray01};
  padding: 1.36rem 1.36rem calc(1.36rem + env(safe-area-inset-bottom));
  gap: 1rem;
`;

const ContentWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
`;

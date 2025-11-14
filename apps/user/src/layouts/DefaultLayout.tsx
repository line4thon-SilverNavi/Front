import styled from "styled-components";
import type { PropsWithChildren } from "react";

type DefaultLayoutProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  noPadding?: boolean;
};

const DefaultLayout = ({
  header,
  footer,
  children,
  noPadding = false,
}: PropsWithChildren<DefaultLayoutProps>) => {
  return (
    <OutletWrapper>
      {header && <HeaderWrapper>{header}</HeaderWrapper>}
      <ContentWrapper $noPadding={noPadding}>
        {children}
      </ContentWrapper>
      {footer && <FooterWrapper>{footer}</FooterWrapper>}
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
`;

const HeaderWrapper = styled.div`
  padding: 1.36rem 1.36rem 0;
`;

const ContentWrapper = styled.div<{ $noPadding?: boolean }>`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: ${({ $noPadding }) => $noPadding ? '0' : '1rem 1.36rem'};
`;

const FooterWrapper = styled.div`
  padding: 0 1.36rem calc(1.36rem + env(safe-area-inset-bottom));
`;

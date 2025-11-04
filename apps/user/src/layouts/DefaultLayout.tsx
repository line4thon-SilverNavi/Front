import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "@components/common/Header";
import NavBar from "@components/common/NavBar";

const DefaultLayout = () => {
  const location = useLocation();
  
  // Header와 NavBar를 숨길 경로들
  const noNavBar = ["/intro", "/login", "/signup"];
  const showNavBar = !noNavBar.includes(location.pathname);
  
  // Padding을 제외할 경로들 (auth 관련 페이지)
  const noPadding = ["/intro", "/login", "/signup"];
  const hasPadding = !noPadding.includes(location.pathname);

  return (
    <OutletWrapper $hasPadding={hasPadding}>
      {showNavBar && <Header />}
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      {showNavBar && <NavBar />}
    </OutletWrapper>
  );
};

export default DefaultLayout;

const OutletWrapper = styled.section<{ $hasPadding: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gray01};
  padding: ${({ $hasPadding }) => 
    $hasPadding 
      ? '1.36rem 1.36rem calc(1.36rem + env(safe-area-inset-bottom))' 
      : '0'
  };
  gap: ${({ $hasPadding }) => ($hasPadding ? '1rem' : '0')};
`;

const ContentWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
`;

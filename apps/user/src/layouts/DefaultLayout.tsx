import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "@components/common/Header";
import NavBar from "@components/common/NavBar";

const DefaultLayout = () => {
  const location = useLocation();
  
  // Header와 NavBar를 숨길 경로들
  const noNavBar = ["/intro", "/login", "/signup"];
  const showNavBar = !noNavBar.includes(location.pathname);

  return (
    <OutletWrapper>
      {showNavBar && <Header />}
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      {showNavBar && <NavBar />}
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

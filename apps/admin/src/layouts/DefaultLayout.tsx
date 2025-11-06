import { Outlet } from "react-router-dom";

import styled from "styled-components";

const DefaultLayout = () => {
  return (
    <OutletWrapper>
      <Outlet />
    </OutletWrapper>
  );
};

export default DefaultLayout;

const OutletWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid red;
`;

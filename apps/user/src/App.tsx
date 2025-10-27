import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { SilverNaviProvider } from "@core";
import styled from "styled-components";

function App() {
  return (
    <SilverNaviProvider isAdmin={false}>
      <RouterProvider router={router} />
    </SilverNaviProvider>
  );
}

export default App;

const Hi = styled.div`
  color: ${({ theme }) => theme.colors.blue03};
  ${({ theme }) => theme.fonts.head1};
`;

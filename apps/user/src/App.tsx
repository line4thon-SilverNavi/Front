import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { SilverNaviProvider } from "@core";

function App() {
  return (
    <SilverNaviProvider isAdmin={false}>
      <RouterProvider router={router} />
    </SilverNaviProvider>
  );
}

export default App;

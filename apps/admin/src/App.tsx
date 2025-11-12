import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { SilverNaviProvider } from "@core";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <SilverNaviProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </SilverNaviProvider>
  );
}

export default App;

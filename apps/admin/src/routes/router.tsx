import { createBrowserRouter } from "react-router-dom";

//layouts
import DefaultLayout from "@layouts/DefaultLayout";
import PrivateRoute from "@layouts/PrivateLayout";
// import LoginPage from "@pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      // {
      //   path: "login",
      //   element: <LoginPage />,
      // },
      {
        element: <PrivateRoute />,
        children: [],
      },
    ],
  },
]);

export default router;

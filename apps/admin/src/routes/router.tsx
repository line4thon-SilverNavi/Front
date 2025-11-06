import { createBrowserRouter } from "react-router-dom";

//layouts
import DefaultLayout from "@layouts/DefaultLayout";
import PrivateRoute from "@layouts/PrivateLayout";
import Login from "@pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <PrivateRoute />,
        children: [],
      },
    ],
  },
]);

export default router;

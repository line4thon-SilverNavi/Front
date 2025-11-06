import { createBrowserRouter } from "react-router-dom";

//layouts
import DefaultLayout from "@layouts/DefaultLayout";
import PrivateRoute from "@layouts/PrivateLayout";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";

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
        path: "signup",
        element: <Signup />,
      },
      {
        element: <PrivateRoute />,
        children: [],
      },
    ],
  },
]);

export default router;

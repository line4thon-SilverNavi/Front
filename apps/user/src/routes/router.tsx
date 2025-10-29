import { createBrowserRouter } from "react-router-dom";

// layouts
import DefaultLayout from "@layouts/DefaultLayout";
// import PrivateRoute from "@layouts/PrivateLayout";

// pages
import Login from "@pages/login/Login";
import Home from "@pages/home/Home";
import Mypage from "@pages/mypage/MyPage";

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
        // element: <PrivateRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "mypage", element: <Mypage /> },
        ],
      },
    ],
  },
]);

export default router;

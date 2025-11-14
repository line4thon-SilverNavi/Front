import { createBrowserRouter, Navigate } from "react-router-dom";

//layouts
import DefaultLayout from "@layouts/DefaultLayout";
import PrivateRoute from "@layouts/PrivateLayout";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";

import AdminProgram from "@pages/AdminProgram";
import AdminRouteLayout from "@layouts/AdminLayout/AdminRouteLayout";
import Request from "@pages/Request";
import Consult from "@pages/Consult";
import Review from "@pages/Review";
import Ads from "@pages/Ads";
import Dashboard from "@pages/Dashboard";
import ScrollToTop from "@hooks/ScrollToTop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <DefaultLayout />
      </>
    ),
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
        children: [
          {
            element: <AdminRouteLayout />,
            children: [
              { index: true, element: <Navigate to="programs" replace /> },
              { path: "programs", element: <AdminProgram /> },
              { path: "requests", element: <Request /> },
              { path: "consult", element: <Consult /> },
              { path: "reviews", element: <Review /> },
              { path: "ads", element: <Ads /> },
              { path: "dashboard", element: <Dashboard /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

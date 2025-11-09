import { createBrowserRouter } from "react-router-dom";

// layouts
import DefaultLayout from "@layouts/DefaultLayout";
// import PrivateRoute from "@layouts/PrivateLayout";

// pages
import Login from "@pages/auth/Login";
import Home from "@pages/home/Home";
import Mypage from "@pages/mypage/MyPage";
import Btn from "@pages/test/Btn";
import Intro from "@pages/auth/Intro";
import Signup from "@pages/auth/Signup";
import FacilityMain from "@pages/facility/FacilityMain";
import FacilityDetailPage from "@pages/facility/FacilityDetail";
import FacilityApplyPage from "@pages/facility/FacilityApply";
import FinishApplyPage from "@pages/facility/FinishApply";
import ProgramHome from "@pages/program/ProgramHome";
import FacilityHome from "@pages/facility/FacilityHome";
import ProgramDetailPage from "@pages/program/ProgramDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "intro", element: <Intro /> },
      {
        path: "login",
        element: <Login />,
      },
      { path: "signup", element: <Signup /> },
      {
        // element: <PrivateRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "program", element: <ProgramHome />},
          { path: "nearfacility", element: <FacilityHome />},
          { path: "program/:programId", element: <ProgramDetailPage />},
          { path: "facility", element: <FacilityMain />},
          { path: "facility/:facilityId", element: <FacilityDetailPage />},
          { path: "facility/:facilityId/apply", element: <FacilityApplyPage />},
          { path: "facility/:facilityId/finish-apply", element: <FinishApplyPage />},
          { path: "mypage", element: <Mypage /> },
          { path: "button", element: <Btn /> },
        ],
      },
    ],
  },
]);

export default router;

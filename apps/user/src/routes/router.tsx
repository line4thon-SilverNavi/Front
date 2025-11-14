import { createBrowserRouter } from "react-router-dom";

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
import SetUserInfo from "@pages/mypage/SetUserInfo";
import Certify from "@pages/mypage/Certify";
import ProgramApply from "@pages/program/ProgramApply";
import History from "@pages/history/History";
import Notification from "@pages/notification/Notification";
import Search from "@pages/search/Search";
import SearchResult from "@pages/search/SearchResult";
import Bookmark from "@pages/mypage/Bookmark";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "intro", element: <Intro /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { index: true, element: <Home /> },
      { path: "program", element: <ProgramHome />},
      { path: "nearfacility", element: <FacilityHome />},
      { path: "program/:programId", element: <ProgramDetailPage />},
      { path: "program/:programId/apply", element: <ProgramApply />},
      { path: "facility", element: <FacilityMain />},
      { path: "facility/:facilityId", element: <FacilityDetailPage />},
      { path: "facility/:facilityId/apply", element: <FacilityApplyPage />},
      { path: "facility/:facilityId/finish-apply", element: <FinishApplyPage />},
      { path: "finishapply", element: <FinishApplyPage />},
      { path: "mypage", element: <Mypage /> },
      { path: "bookmark", element: <Bookmark /> },
      { path: "setuser", element: <SetUserInfo /> },
      { path: "certify", element: <Certify /> },
      { path: "history", element: <History /> },
      { path: "notification", element: <Notification /> },
      { path: "search", element: <Search /> },
      { path: "search/result", element: <SearchResult /> },
      { path: "button", element: <Btn /> },
    ],
  },
]);

export default router;

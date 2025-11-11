import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ADMIN_NAV_ITEMS, type AdminNavKey } from "@constants/admin-nav";
import AdminLayout from "./AdminLayout";
import { clearTokens } from "@core/api/auth";

const pathToKey = (pathname: string): AdminNavKey => {
  if (pathname.includes("/requests")) return "requests";
  if (pathname.includes("/consult")) return "consult";
  if (pathname.includes("/reviews")) return "reviews";
  if (pathname.includes("/ads")) return "ads";
  if (pathname.includes("/dashboard")) return "dashboard";
  return "programs";
};

const keyToPath: Record<AdminNavKey, string> = {
  programs: "/programs",
  requests: "/requests",
  consult: "/consult",
  reviews: "/reviews",
  ads: "/ads",
  dashboard: "/dashboard",
  logout: "/logout",
};

const DEFAULT_DES: Partial<Record<AdminNavKey, string>> = {
  requests: "신청 접수 현황을 검토하고 승인/반려를 처리하세요.",
  consult: "상담을 유연하게 관리해보세요!",
  reviews: "프로그램  및 시설리뷰를 확인하고 관리할 수 있습니다",
  ads: "사용자 앱의 시설 상세 페이지에 표시될 정보를 수정하세요",
};

export default function AdminRouteLayout() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const activeKey = pathToKey(pathname);
  const title =
    ADMIN_NAV_ITEMS.find((i) => i.key === activeKey)?.label ?? "관리자";
  const des = DEFAULT_DES[activeKey] ?? "";

  const onNavigate = (key: AdminNavKey) => {
    if (key === "logout") {
      clearTokens();
      nav("/login", { replace: true });
      return;
    }
    nav(keyToPath[key]);
  };

  return (
    <AdminLayout
      title={title}
      des={des}
      activeKey={activeKey}
      onNavigate={onNavigate}
      right={<span>시설 관리자</span>}
    >
      <Outlet />
    </AdminLayout>
  );
}

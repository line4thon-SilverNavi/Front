export type AdminNavKey =
  | "programs"
  | "requests"
  | "consult"
  | "reviews"
  | "ads"
  | "dashboard"
  | "logout";

export type AdminNavItem = {
  key: AdminNavKey;
  label: string;
  icon: string;
  badge?: string;
};

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    key: "programs",
    label: "프로그램 관리",
    icon: "/img/sidebar/program.svg",
  },
  {
    key: "requests",
    label: "신청 관리",
    icon: "/img/sidebar/request.svg",
  },
  {
    key: "consult",
    label: "상담 관리",
    icon: "/img/sidebar/consult.svg",
  },
  {
    key: "reviews",
    label: "리뷰 관리",
    icon: "/img/sidebar/review.svg",
  },
  {
    key: "ads",
    label: "홍보 관리",
    icon: "/img/sidebar/ads.svg",
  },
  {
    key: "dashboard",
    label: "대시보드",
    icon: "/img/sidebar/dashboard.svg",
    badge: "PRO",
  },
] as const;

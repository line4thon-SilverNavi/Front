import { getResponse } from "@core/api/instance";
import type { ConsultCategory } from "./getConsultDetail";

export type ConsultStatus = "대기중" | "확인됨" | "완료" | "거부";

export type ConsultItem = {
  consultId: number;
  consultDate: string;
  consultCategory: ConsultCategory;
  name: string;
  relationRole: string | null;
  phone: string;
  status: ConsultStatus;
};

export type ConsultSummary = {
  totalCount: number;
  pendingCount: number;
  approvedCount: number;
  completedCount: number;
};

export type PageInfo = {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
};

type ConsultManagementData = {
  summary: ConsultSummary;
  consults: ConsultItem[];
  pageInfo: PageInfo;
};

type ApiEnvelope<T> = {
  isSuccess: boolean;
  message: string;
  data: T;
};

type GetConsultManagementParams = {
  page?: number;
  status?: ConsultStatus | "전체";
  keyword?: string; // 검색어
};

export async function getConsultManagement(params: GetConsultManagementParams) {
  const query = new URLSearchParams();

  query.set("page", String(params.page ?? 1));

  if (params.status && params.status !== "전체") {
    query.set("status", params.status);
  }

  const trimmed = params.keyword?.trim();
  if (trimmed) {
    query.set("keyword", trimmed);
  }

  const qs = query.toString();
  const url = qs
    ? `/api/consults/management?${qs}`
    : `/api/consults/management`;

  const res = await getResponse<ApiEnvelope<ConsultManagementData>>(url);

  if (!res) {
    throw new Error("상담 관리 정보를 불러오지 못했습니다.");
  }
  if (!res.isSuccess) {
    throw new Error(res.message || "상담 관리 API 호출에 실패했습니다.");
  }

  return res.data;
}

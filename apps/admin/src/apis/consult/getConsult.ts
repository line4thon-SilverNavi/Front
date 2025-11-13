import { getResponse } from "@core/api/instance";

export type ConsultStatus = "대기중" | "확인됨" | "완료" | "거부";

export type ConsultSummary = {
  totalCount: number;
  pendingCount: number;
  approvedCount: number;
  completedCount: number;
};

export type ConsultItem = {
  consultId: number;
  consultDate: string;
  consultCategory: string;
  name: string;
  relationRole: string | null;
  phone: string;
  status: ConsultStatus;
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
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: T;
};

export type ConsultManagementRes = ApiEnvelope<ConsultManagementData>;

type GetConsultManagementParams = {
  page?: number;
  status?: ConsultStatus | "전체";
};

export async function getConsultManagement(params: GetConsultManagementParams) {
  const query = new URLSearchParams();

  query.set("page", String(params.page ?? 1));

  if (params.status && params.status !== "전체") {
    query.set("status", params.status);
  }

  const qs = query.toString();
  const url = qs
    ? `/api/consults/management?${qs}`
    : `/api/consults/management`;

  const res = await getResponse<ConsultManagementRes>(url);

  if (!res) {
    throw new Error("상담 관리 정보를 불러오지 못했습니다.");
  }

  if (!res.isSuccess) {
    throw new Error(res.message || "상담 관리 API 호출에 실패했습니다.");
  }

  return res.data;
}

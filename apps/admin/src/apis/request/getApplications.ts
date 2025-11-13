import { getResponse } from "@core/api/instance";

export type ApplicationStatus = "대기중" | "승인" | "거부";

export type ApplicationsSummary = {
  totalCount: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
};

export type ApplicationItem = {
  applicationId: number;
  applicationDate: string;
  programName: string;
  applicantName: string;
  phone: string;
  status: ApplicationStatus;
};

export type PageInfo = {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
};

export type ApplicationsRes = {
  summary: ApplicationsSummary;
  applications: ApplicationItem[];
  pageInfo: PageInfo;
};

export async function getApplications(params?: {
  page?: number;
  status?: ApplicationStatus;
}): Promise<ApplicationsRes> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.status) search.set("status", params.status);

  const url =
    "/api/applications" + (search.toString() ? `?${search.toString()}` : "");

  const res = await getResponse<{
    isSuccess: boolean;
    message?: string;
    data: ApplicationsRes;
  }>(url);

  if (!res?.isSuccess) {
    throw new Error(res?.message || "신청 내역을 불러오지 못했습니다.");
  }
  return res.data;
}

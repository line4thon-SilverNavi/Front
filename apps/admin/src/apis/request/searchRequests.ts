import instance from "@core/api/instance";
import type { ApiEnvelope } from "@apis/program/types";
import type { ApplicationItem } from "./getApplications";

export async function searchRequests(
  rawQuery: string
): Promise<ApplicationItem[]> {
  const keyword = rawQuery.trim();

  if (!keyword) {
    return [];
  }
  const res = await instance.get<ApiEnvelope<ApplicationItem[]>>(
    "/api/applications/search",
    {
      params: {
        keyword,
      },
    }
  );

  if (!res.data?.isSuccess) {
    throw new Error(res.data?.message || "신청 검색에 실패했습니다.");
  }

  return res.data.data;
}

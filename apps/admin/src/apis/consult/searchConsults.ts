import instance from "@core/api/instance";
import type { ApiEnvelope } from "@apis/program/types";
import type { ConsultItem } from "./getConsult";

export async function searchConsults(rawQuery: string): Promise<ConsultItem[]> {
  const keyword = rawQuery.trim();

  if (!keyword) {
    return [];
  }
  const res = await instance.get<ApiEnvelope<ConsultItem[]>>(
    "/api/consults/search",
    {
      params: {
        keyword,
      },
    }
  );

  if (!res.data?.isSuccess) {
    throw new Error(res.data?.message || "상담 검색에 실패했습니다.");
  }

  return res.data.data;
}

import instance from "@core/api/instance";
import type { ProgramItem } from "@apis/program/getPrograms";
import type { ApiEnvelope } from "@apis/program/types";

export async function searchPrograms(rawQuery: string): Promise<ProgramItem[]> {
  const keyword = rawQuery.trim();

  if (!keyword) {
    return [];
  }

  const res = await instance.get<ApiEnvelope<ProgramItem[]>>(
    "/api/programs/search",
    {
      params: {
        keyword,
      },
    }
  );

  if (!res.data?.isSuccess) {
    throw new Error(res.data?.message || "프로그램 검색에 실패했습니다.");
  }

  return res.data.data;
}

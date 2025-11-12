import { getResponse } from "@core/api/instance";

import type { ApiEnvelope, ProgramDetail } from "./types";

export async function getProgramDetail(id: number): Promise<ProgramDetail> {
  const res = await getResponse<ApiEnvelope<ProgramDetail>>(
    `/api/programs/${id}`
  );
  if (!res?.isSuccess) {
    throw new Error(res?.message || "프로그램 정보를 불러오지 못했습니다.");
  }
  return res.data;
}

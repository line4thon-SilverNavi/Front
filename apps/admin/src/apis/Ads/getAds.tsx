import { getResponse } from "@core/api/instance";
import type { ApiEnvelope, AdsDetail } from "./types";

export async function getAdsDetail(): Promise<AdsDetail> {
  const res = await getResponse<ApiEnvelope<AdsDetail>>("/api/facilities");

  if (!res) {
    throw new Error("시설 정보를 불러오지 못했습니다.");
  }
  return res.data;
}

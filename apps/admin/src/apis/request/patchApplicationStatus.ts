import { patchResponse } from "@core/api/instance";

export type PatchApplicationStatusReq = {
  isApproved: boolean;
  reason?: string | null;
};

type ApiEnvelope<T> = {
  isSuccess: boolean;
  data: T;
  message?: string;
};

export async function patchApplicationStatus(
  applicationId: number,
  payload: PatchApplicationStatusReq
): Promise<void> {
  const res = await patchResponse<PatchApplicationStatusReq, ApiEnvelope<null>>(
    `/api/applications/${applicationId}`,
    payload
  );

  if (!res?.isSuccess) {
    throw new Error(res?.message || "신청 상태 변경에 실패했습니다.");
  }
}

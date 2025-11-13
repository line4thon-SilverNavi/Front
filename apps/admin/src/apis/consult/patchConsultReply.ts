import { patchResponse } from "@core/api/instance";
import type { ConsultCategory } from "@apis/consult/getConsultDetail";

export type ConfirmedTime = "오전" | "오후" | "저녁";

export type ConsultStatusForPatch = "대기중" | "확인됨" | "완료" | "거부";

type PatchConsultReplyReq = {
  confirmedDate: string;
  confirmedTime: ConfirmedTime;
  consultStatus: ConsultStatusForPatch;
};

type Envelope = {
  isSuccess: boolean;
  message?: string;
};

export async function patchConsultReply(
  consultId: number,
  category: ConsultCategory,
  body: PatchConsultReplyReq
): Promise<void> {
  const res = await patchResponse<PatchConsultReplyReq, Envelope>(
    `/api/consults/${consultId}/${category}`,
    body
  );

  if (!res?.isSuccess) {
    throw new Error(res?.message || "상담 답변 저장에 실패했습니다.");
  }
}

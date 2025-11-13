import { postResponse } from "@core/api/instance";

export type ConsultReplyBody = {
  consultId: number;
  category: "일반상담" | "시설상담";
  content: string;
};

export async function postConsultReply(body: ConsultReplyBody) {
  const res = await postResponse("/api/consults/reply", body);

  if (res) return;
}

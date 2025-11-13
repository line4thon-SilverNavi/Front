import { getResponse } from "@core/api/instance";
import type { ConfirmedTime, ConsultStatusForPatch } from "./patchConsultReply";

export type ConsultCategory = "일반상담" | "시설상담";
export type ConsultStatus = "대기중" | "확인됨" | "완료" | "거부";

export type ConsultDetail = {
  consultCategory: ConsultCategory;
  status: ConsultStatus;
  appliedAt: string;

  name: string;
  phone: string;
  birthDate: string;
  age: number;
  grade: string;

  careName: string | null;
  carePhone: string | null;

  hopeDate: string | null;
  hopeTime: string | null;
  consultType: string | null;

  inquiryType: string | null;
  inquiryContent: string | null;
  confirmedDate: string | null;
  confirmedTime: ConfirmedTime | null;
  consultStatus: ConsultStatusForPatch;
};

type Envelope = {
  isSuccess: boolean;
  data: ConsultDetail;
  message?: string;
};

export async function getConsultDetail(
  consultId: number,
  category: ConsultCategory
): Promise<ConsultDetail> {
  const res = await getResponse<Envelope>(
    `/api/consults/${consultId}/${category}`
  );

  if (!res?.isSuccess) {
    throw new Error(res?.message || "상담 상세 정보를 불러오지 못했습니다.");
  }

  return res.data;
}

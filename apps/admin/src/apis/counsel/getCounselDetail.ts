import type { CounselStatus } from "@components/CounselStatusBadge";
import { getResponse } from "@core/api/instance";

export type CounselDetail = {
  appliedAt: string;
  counselType: string;
  status: CounselStatus;

  applicantName: string;
  applicantPhone: string;
  birth: string;
  age: number;
  careGrade: string;
  careName: string | null;
  carePhone: string | null;

  hopeDate: string;
  questionType: string;
  content: string;

  fixedDate?: string | null;
  statusChangeLabel?: string | null;
};

type Envelope = {
  isSuccess: boolean;
  data: CounselDetail;
  message?: string;
};

export async function getCounselDetail(
  counselId: number
): Promise<CounselDetail> {
  const res = await getResponse<Envelope>(`/api/counsels/${counselId}`);
  if (!res?.isSuccess) {
    throw new Error(res?.message || "상담 상세 정보를 불러오지 못했습니다.");
  }
  return res.data;
}

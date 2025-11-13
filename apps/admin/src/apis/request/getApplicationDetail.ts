import { getResponse } from "@core/api/instance";

export type ApplicationStatus = "대기중" | "승인" | "거부";

export type ApplicationDetail = {
  programName: string;
  applicationDate: string;
  applicantName: string;
  applicantPhone: string;
  careName: string | null;
  carePhone: string | null;
  age: number;
  careGrade: string;
  content: string;
  status: ApplicationStatus;
};

type Envelope = {
  isSuccess: boolean;
  message?: string;
  data: ApplicationDetail;
};

export async function getApplicationDetail(
  applicationId: number
): Promise<ApplicationDetail> {
  const res = await getResponse<Envelope>(`/api/applications/${applicationId}`);
  if (!res?.isSuccess) {
    throw new Error(res?.message || "신청자 상세 정보를 불러오지 못했습니다.");
  }
  return res.data;
}

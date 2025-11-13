import { getResponse } from "@core/api/instance";

export type ConsultCategory = "일반상담" | "시설상담";
export type ConsultStatus = "대기중" | "확인됨" | "완료" | "거부";

type ConsultDetailApi = {
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
  hopeTime?: string | null;
  time?: string | null;

  consultType: string | null;
  inquiryType: string | null;
  inquiryContent: string | null;
};

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
};

type Envelope = {
  isSuccess: boolean;
  data: ConsultDetailApi;
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

  const raw = res.data;

  return {
    consultCategory: raw.consultCategory,
    status: raw.status,
    appliedAt: raw.appliedAt,
    name: raw.name,
    phone: raw.phone,
    birthDate: raw.birthDate,
    age: raw.age,
    grade: raw.grade,
    careName: raw.careName,
    carePhone: raw.carePhone,
    hopeDate: raw.hopeDate,
    hopeTime: raw.hopeTime ?? raw.time ?? null,
    consultType: raw.consultType,
    inquiryType: raw.inquiryType,
    inquiryContent: raw.inquiryContent,
  };
}

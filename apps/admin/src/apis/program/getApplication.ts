import { getResponse } from "@core/api/instance";

export type AttendanceStatus = "출석" | "결석" | null;

export type ProgramApplicant = {
  applicantId: number;
  name: string;
  gender: "male" | "female";
  age: number;
  careName: string | null;
  phone: string;
  attendanceStatus: AttendanceStatus;
};

export type ProgramApplicationsRes = {
  summary: {
    totalApplicants: number;
    attendanceCount: number;
    attendanceRate: number;
  };
  applicants: ProgramApplicant[];
};

type RawApiResponse = {
  isSuccess: boolean;
  message?: string;
  data: ProgramApplicationsRes;
};

export async function getProgramApplications(
  programId: number
): Promise<ProgramApplicationsRes> {
  const res = await getResponse<RawApiResponse>(
    `/api/programs/${programId}/applications`
  );

  if (!res?.isSuccess || !res.data) {
    throw new Error(res?.message || "신청자 정보를 불러오지 못했습니다.");
  }

  return res.data;
}

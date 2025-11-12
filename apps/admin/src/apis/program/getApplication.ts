import { dummyData } from "@apis/dummy/applicant";
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
    attendanceRate: number; // 0~1
  };
  applicants: ProgramApplicant[];
};

// export async function getProgramApplications(
//   programId: number
// ): Promise<ProgramApplicationsRes> {
//   const res = await getResponse<{
//     isSuccess: boolean;
//     data: ProgramApplicationsRes;
//     message?: string;
//   }>(`/api/programs/${programId}/applications`);
//   if (!res?.isSuccess) {
//     throw new Error(res?.message || "신청자 정보를 불러오지 못했습니다.");
//   }
//   return res.data;
// }

export async function getProgramApplications(
  programId: number
): Promise<ProgramApplicationsRes> {
  console.log(`[MOCK] getProgramApplications(${programId})`);

  // 실제 API 호출 대신 dummyData 리턴
  await new Promise((r) => setTimeout(r, 400)); // 로딩 시뮬레이션
  return dummyData;
}

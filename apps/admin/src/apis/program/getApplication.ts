// import { dummyData } from "@apis/dummy/applicant";
// import { getResponse } from "@core/api/instance";

// export type AttendanceStatus = "출석" | "결석" | null;

// export type ProgramApplicant = {
//   applicantId: number;
//   name: string;
//   gender: "male" | "female";
//   age: number;
//   careName: string | null;
//   phone: string;
//   attendanceStatus: AttendanceStatus;
// };

// export type ProgramApplicationsRes = {
//   summary: {
//     totalApplicants: number;
//     attendanceCount: number;
//     attendanceRate: number;
//   };
//   applicants: ProgramApplicant[];
// };

// type RawApiResponse = {
//   isSuccess: boolean;
//   message?: string;
//   data: ProgramApplicationsRes;
// };

// export async function getProgramApplications(
//   programId: number
// ): Promise<ProgramApplicationsRes> {
//   const res = await getResponse<RawApiResponse>(
//     `/api/programs/${programId}/applications`
//   );

//   if (!res?.isSuccess || !res.data) {
//     throw new Error(res?.message || "신청자 정보를 불러오지 못했습니다.");
//   }

//   const data = res.data;

//   if (data.applicants.length === 0) {
//     return dummyData;
//   }
//   return data;
// }

import { getResponse, patchResponse } from "@core/api/instance";

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

type RawGetApplicationsRes = {
  isSuccess: boolean;
  message?: string;
  data: ProgramApplicationsRes;
};

// 프로그램 신청자/출석 정보 조회 (GET)

export async function getProgramApplications(
  programId: number
): Promise<ProgramApplicationsRes> {
  const res = await getResponse<RawGetApplicationsRes>(
    `/api/programs/${programId}/applications`
  );

  if (!res?.isSuccess || !res.data) {
    throw new Error(res?.message || "신청자 정보를 불러오지 못했습니다.");
  }

  const data = res.data;

  // if (data.applicants.length === 0) {
  //   return dummyData;
  // }
  return data;
}

// 출석 저장

type RawToggleAttendanceRes = {
  isSuccess: boolean;
  message?: string;
};

export async function toggleProgramAttendance(
  programId: number,
  applicantIds: number[]
): Promise<void> {
  const res = await patchResponse<
    { applicantIds: number[] },
    RawToggleAttendanceRes
  >(`/api/programs/${programId}/applications`, { applicantIds });

  if (!res || !res.isSuccess) {
    throw new Error(res?.message || "출석 정보를 저장하지 못했습니다.");
  }
}

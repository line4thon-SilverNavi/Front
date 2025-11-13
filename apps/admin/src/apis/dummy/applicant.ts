// /src/shared/mock/dummyData.ts
import type { ProgramApplicationsRes } from "@apis/program/getApplication";

export const dummyData = {
  summary: {
    totalApplicants: 6,
    attendanceCount: 2,
    attendanceRate: 0.3333,
  },
  applicants: [
    {
      applicantId: 1,
      name: "김순자",
      gender: "female",
      age: 55,
      careName: null,
      phone: "010-1111-1111",
      attendanceStatus: "출석",
    },
    {
      applicantId: 2,
      name: "박순자",
      gender: "female",
      age: 53,
      careName: null,
      phone: "010-2222-2222",
      attendanceStatus: "결석",
    },
    {
      applicantId: 3,
      name: "김영자",
      gender: "female",
      age: 73,
      careName: "김지영 (어머니)",
      phone: "010-7777-7777",
      attendanceStatus: "출석",
    },
    {
      applicantId: 4,
      name: "정동환",
      gender: "male",
      age: 60,
      careName: null,
      phone: "010-1234-1212",
      attendanceStatus: "결석",
    },
    {
      applicantId: 5,
      name: "김홍배",
      gender: "male",
      age: 58,
      careName: null,
      phone: "010-5555-5555",
      attendanceStatus: "결석",
    },
    {
      applicantId: 6,
      name: "이영자",
      gender: "female",
      age: 62,
      careName: null,
      phone: "010-6666-6666",
      attendanceStatus: "출석",
    },
  ],
} as const satisfies ProgramApplicationsRes;

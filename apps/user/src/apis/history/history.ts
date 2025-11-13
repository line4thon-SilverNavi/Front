import { getResponse } from "@core/api/instance";

// 프로그램 신청 내역 항목
export type ProgramHistoryItem = {
    programId: number;
    programName: string;
    location: string;
    category: string;
    date: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    currentApplicants: number;
    capacity: number;
    fee: string;
    thumbnail: string | null;
    bookmarked: boolean;
    status: "예정" | "완료";
};

// 프로그램 신청 내역 데이터
export type ProgramHistoryData = {
    scheduledCount: number;
    completedCount: number;
    programs: ProgramHistoryItem[];
};

// 전체 응답 타입
export type ProgramHistoryResponse = {
    isSuccess: boolean;
    timestamp: string;
    code: string;
    httpStatus: number;
    message: string;
    data: ProgramHistoryData;
};

export async function getProgramHistory() {
    const response = await getResponse<ProgramHistoryResponse>(
        "/api/applications/list"
    );
    return response?.data || null;
}

// ------------------------------ 

// 시설 상담 내역 항목
export type ConsultHistoryItem = {
    id: number;
    facilityName: string;
    consultCategory: "일반상담" | "시설상담";
    consultType: "대면" | "비대면" | null;
    consultStatus: "대기중" | "확인됨" | "완료";
    content: string;
    createdAt: string;
};

// 시설 상담 내역 데이터
export type ConsultHistoryData = {
    totalCount: number | 0;
    waitingCount: number;
    confirmedCount: number;
    completedCount: number;
    consults: ConsultHistoryItem[];
};

// 시설 상담 내역 응답 타입
export type ConsultHistoryResponse = {
    isSuccess: boolean;
    timestamp: string;
    code: string;
    httpStatus: number;
    message: string;
    data: ConsultHistoryData;
};

export async function getConsultHistory() {
    const response = await getResponse<ConsultHistoryResponse>(
        "/api/consults"
    );
    return response?.data || null;
}

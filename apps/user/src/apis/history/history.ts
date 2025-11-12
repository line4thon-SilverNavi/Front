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

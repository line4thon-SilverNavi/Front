import { getResponse } from "@core/api/instance";


// 프로그램 상세 데이터 (data 부분)
export type ProgramDetailData = {
    programId: number;
    name: string;
    category: string;
    instructorName: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    capacity: number;
    fee: string;
    number: string;
    description: string;
    supplies: string[];
    proposal: string | null;
    images: string[];
    bookmarked: boolean;
};

// 전체 응답 타입
export type ProgramDetailResponse = {
    isSuccess: boolean;
    timestamp: string;
    code: string;
    httpStatus: number;
    message: string;
    data: ProgramDetailData;
};

export async function getProgramDetail(programId: number) {
    const response = await getResponse<ProgramDetailResponse>(
        `/api/programs/details/${programId}`
    );
    return response?.data || null;
}

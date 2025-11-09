import { getResponse } from "@core/api/instance";

export type ProgramListResponse = {
    programId: number;
    programName: string | null;
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
};

export async function getProgramList() { 
    const response = await getResponse<{ data: ProgramListResponse[] }>(
        "/api/programs/list"
    );
    return response?.data || [];
}

import { getResponse } from "@core/api/instance";

export type ProgramListResponse = {
    programId: number;
    programName: string | null;
    category: string;
    date: string; 
    dayOfWeek: string;
    location: string;
    startTime: string;
    endTime: string;
    currentApplicants: number;
    capacity: number;
    fee: string; 
    thumbnail: string | null; 
    bookmarked: boolean;
};

export async function getProgramList() { 
    return await getResponse<ProgramListResponse[]>(
        "/api/programs/list"
    );
}

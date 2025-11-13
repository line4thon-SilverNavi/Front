import { getResponse } from "@core/api/instance";

export type ProgramSearchResult = {
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
};

export type FacilitySearchResult = {
    facilityId: number;
    name: string;
    thumbnail: string | null;
    distanceKm: number;
    averageRating: number;
    reviewCount: number;
    operatingHours: string | null;
    phoneNumber: string;
    category: string | null;
    bookmarked: boolean;
};

export type SearchResponse = {
    programs: ProgramSearchResult[];
    facilities: FacilitySearchResult[];
};

export async function searchPrograms(keyword: string) { 
    const response = await getResponse<{ data: SearchResponse }>(
        `/api/searchs?keyword=${encodeURIComponent(keyword)}`
    );
    return response?.data?.programs || [];
}

export async function searchFacilities(keyword: string) { 
    const response = await getResponse<{ data: SearchResponse }>(
        `/api/searchs?keyword=${encodeURIComponent(keyword)}`
    );
    return response?.data?.facilities || [];
}

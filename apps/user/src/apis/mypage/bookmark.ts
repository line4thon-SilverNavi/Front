import { getResponse } from "@core/api/instance";

export type BookmarkProgram = {
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

export type BookmarkFacility = {
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

export type BookmarkData = {
    programCount: number;
    facilityCount: number;
    results: {
        programs: BookmarkProgram[];
        facilities: BookmarkFacility[];
    };
};

export async function getBookmarks() {
    const response = await getResponse<{ data: BookmarkData }>(
        `/api/bookmarks`
    );
    return response?.data;
}

import { getResponse } from "@core/api/instance";

export type FacilityListResponse = {
    facilityId: number;
    name: string | null;
    thumbnail: string;
    distanceKm: number;
    averageRating: number;
    reviewCount: number;
    operatingHours: string | null;
    phoneNumber: string | null;
    category: string | null;
    bookmarked: boolean;
};

export async function getFacilityList() {
    return await getResponse<FacilityListResponse[]>(
        "/api/facilities/list"
    );
}

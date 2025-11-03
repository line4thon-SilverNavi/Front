import { getResponse } from "@core/api/instance";

export type FacilityListResponse = {
    facilityId: number | 0;
    name: string | null;
    thumbnail: string;
    distanceKm: number | 0;
    averageRating: number | 0;
    reviewCount: number | 0;
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

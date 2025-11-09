import { getResponse } from "@core/api/instance";

export type FacilityListResponse = {
    facilityId: number;
    name: string | null;
    thumbnail: string | null;
    distanceKm: number;
    averageRating: number;
    reviewCount: number;
    operatingHours: string | null;
    phoneNumber: string | null;
    category: string | null;
    bookmarked: boolean;
};

export async function getFacilityList() {
    const response = await getResponse<{ data: FacilityListResponse[] }>(
        "/api/facilities/list"
    );
    return response?.data || [];
}

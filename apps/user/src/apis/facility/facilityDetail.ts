import { getResponse } from "@core/api/instance";


// 리뷰 타입
export type ReviewRes = {
    id: number;
    authorName: string;
    rating: number;
    content: string;
    createdAt: string;
};

// 시설 상세 데이터 (data 부분)
export type FacilityDetailData = {
    name: string;
    category: string;
    operatingHours: string;
    number: string;
    address: string;
    description: string;
    mainServices: string[];
    images: string[];
    distanceKm: number;
    averageRating: number;
    reviewCount: number;
    reviews: ReviewRes[];
    bookmarked: boolean;
};

// 전체 응답 타입
export type FacilityDetailResponse = {
    isSuccess: boolean;
    timestamp: string;
    code: string;
    httpStatus: number;
    message: string;
    data: FacilityDetailData;
};

export async function getFacilityDetail(facilityId: number) {
    const response = await getResponse<FacilityDetailResponse>(
        `/api/facilities/${facilityId}`
    );
    return response?.data || null;
}

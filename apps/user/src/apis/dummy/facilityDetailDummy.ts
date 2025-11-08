import type { FacilityDetailData } from "@apis/facility/facilityDetail";

// 더미 데이터
export const facilityDetailDummy: FacilityDetailData = {
    name: "성신노인요양원",
    category: "요양병원",
    operatingHours: "오전 10:30 - 20:00",
    number: "0507-1335-8538",
    address: "정릉동 123-45",
    description: "지리는 요양시설.. 일단 두줄이상이되게 아무말이나해보기 아무맒아무말아무말 목마르당",
    mainServices: ["건강검진", "식사 제공", "여가 활동", "물리치료"],
    images: [
        "/img/dummy/facility-default.png",
        "/img/dummy/facility-default.png"
    ],
    distanceKm: 3.5,
    averageRating: 4.75,
    reviewCount: 2,
    bookmarked: false,
    reviews: [
        {
            id: 101,
            authorName: "김이용",
            rating: 4,
            content: "시설이 깨끗하고 직원분들이 친절합니다.",
            createdAt: "2025-10-25T14:30:00"
        },
        {
            id: 102,
            authorName: "박신청",
            rating: 5,
            content: "부모님이 만족하셔서 좋습니다.",
            createdAt: "2025-10-28T09:15:00"
        }
    ]
};

// 더미 API 함수
export async function getFacilityDetailDummy(_facilityId: number): Promise<FacilityDetailData> {
    // 실제로는 _facilityId에 따라 다른 데이터를 반환할 수 있음
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(facilityDetailDummy);
        });
    });
}

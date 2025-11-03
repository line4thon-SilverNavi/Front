import { useEffect, useState } from "react";
import * as s from "./Home_styled";
import FacilityCard from "@components/facility/facilityCard";
import { getFacilityList, type FacilityListResponse } from "@apis/facility/facilityList";

// 임시 더미 데이터
const dummyData: FacilityListResponse[] = [
  {
    facilityId: 1,
    name: "정릉주간보호센터",
    thumbnail: "/img/dummy/ImageWithFallback.png",
    distanceKm: 2.9,
    averageRating: 4.4,
    reviewCount: 28,
    operatingHours: "평일 09:00 - 18:00",
    phoneNumber: "02-321-7890",
    category: "주간보호센터",
    bookmarked: true,
  },
  {
    facilityId: 2,
    name: "성북노인복지관",
    thumbnail: "/img/dummy/ImageWithFallback.png",
    distanceKm: 1.5,
    averageRating: 4.7,
    reviewCount: 42,
    operatingHours: "평일 09:00 - 18:00",
    phoneNumber: "02-123-4567",
    category: "복지관",
    bookmarked: false,
  },
  {
    facilityId: 3,
    name: "안암동 데이케어센터",
    thumbnail: "/img/dummy/ImageWithFallback.png",
    distanceKm: 3.2,
    averageRating: 4.2,
    reviewCount: 15,
    operatingHours: "평일 08:00 - 19:00",
    phoneNumber: "02-987-6543",
    category: "데이케어센터",
    bookmarked: false,
  },
];

const Home = () => {
  const [facilities, setFacilities] = useState<FacilityListResponse[]>(dummyData); // 임시로 더미 데이터 사용

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await getFacilityList();
        if (data) {
          // 최대 3개만 표시
          setFacilities(data.slice(0, 3));
        }
      } catch (error) {
        console.error("시설 목록 불러오기 실패:", error);
        // API 실패 시 더미 데이터 유지
      }
    };

    // fetchFacilities(); // 임시로 주석 처리
  }, []);

  return (
    <s.HomeWrapper>
      <s.Facilities>
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <FacilityCard
              key={facility.facilityId}
              facilityId={facility.facilityId}
              name={facility.name}
              thumbnail={facility.thumbnail}
              distanceKm={facility.distanceKm}
              averageRating={facility.averageRating}
              reviewCount={facility.reviewCount}
              operatingHours={facility.operatingHours}
              phoneNumber={facility.phoneNumber}
              bookmarked={facility.bookmarked}
            />
          ))
        ) : (
          <p>시설 정보가 없습니다.</p>
        )}
      </s.Facilities>
    </s.HomeWrapper>
  );
};

export default Home;

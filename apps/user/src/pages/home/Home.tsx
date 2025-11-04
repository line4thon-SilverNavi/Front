import { useEffect, useState } from "react";
import * as s from "./Home_styled";
import FacilityCard from "@components/facility/facilityCard";
import ProgramCard from "@components/program/programCard";
import { getFacilityList, type FacilityListResponse } from "@apis/facility/facilityList";
import { getProgramList, type ProgramListResponse } from "@apis/program/programList";

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

// 프로그램 임시 더미 데이터
const dummyProgramData: ProgramListResponse[] = [
  {
    programId: 1,
    programName: "건강체조 교실",
    category: "건강",
    date: "2025-11-15",
    dayOfWeek: "금",
    location: "정릉주간보호센터",
    startTime: "14:00",
    endTime: "15:30",
    currentApplicants: 15,
    capacity: 20,
    fee: "무료",
    thumbnail: "/img/dummy/ImageWithFallback.png",
    bookmarked: true,
  },
  {
    programId: 2,
    programName: "실버요가 프로그램",
    category: "운동",
    date: "2025-11-18",
    dayOfWeek: "월",
    location: "성북노인복지관",
    startTime: "10:00",
    endTime: "11:30",
    currentApplicants: 18,
    capacity: 20,
    fee: "5,000원",
    thumbnail: "/img/dummy/ImageWithFallback.png",
    bookmarked: false,
  },
  {
    programId: 3,
    programName: "인지능력 향상 프로그램",
    category: "교육",
    date: "2025-11-20",
    dayOfWeek: "수",
    location: "안암동 데이케어센터",
    startTime: "13:00",
    endTime: "14:30",
    currentApplicants: 12,
    capacity: 15,
    fee: "무료",
    thumbnail: "/img/dummy/ImageWithFallback.png",
    bookmarked: false,
  },
];

const Home = () => {
  const [facilities, setFacilities] = useState<FacilityListResponse[]>(dummyData); // 임시로 더미 데이터 사용
  const [programs, setPrograms] = useState<ProgramListResponse[]>(dummyProgramData); // 프로그램 임시 더미 데이터

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

    const fetchPrograms = async () => {
      try {
        const data = await getProgramList();
        if (data) {
          // 최대 3개만 표시
          setPrograms(data.slice(0, 3));
        }
      } catch (error) {
        console.error("프로그램 목록 불러오기 실패:", error);
        // API 실패 시 더미 데이터 유지
      }
    };

    fetchFacilities();
    fetchPrograms();
  }, []);

  return (
    <s.HomeWrapper>
      <s.SectionTitle>시설 목록</s.SectionTitle>
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

      <s.SectionTitle>프로그램 목록</s.SectionTitle>
      <s.Programs>
        {programs.length > 0 ? (
          programs.map((program) => (
            <ProgramCard
              key={program.programId}
              programId={program.programId}
              programName={program.programName}
              category={program.category}
              date={program.date}
              dayOfWeek={program.dayOfWeek}
              location={program.location}
              startTime={program.startTime}
              endTime={program.endTime}
              currentApplicants={program.currentApplicants}
              capacity={program.capacity}
              fee={program.fee}
              thumbnail={program.thumbnail}
              bookmarked={program.bookmarked}
            />
          ))
        ) : (
          <p>프로그램 정보가 없습니다.</p>
        )}
      </s.Programs>
    </s.HomeWrapper>
  );
};

export default Home;

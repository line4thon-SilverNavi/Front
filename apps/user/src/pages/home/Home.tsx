import { useEffect, useState } from "react";
import * as s from "./Home_styled";
import FacilityCard from "@components/facility/facilityCard";
import ProgramCard from "@components/program/programCard";
import { getFacilityList, type FacilityListResponse } from "@apis/facility/facilityList";
import { getProgramList, type ProgramListResponse } from "@apis/program/programList";
import { dummyFacilityData } from "@apis/dummy/facilityDummy";
import { dummyProgramData } from "@apis/dummy/programDummy";

const Home = () => {
  const [facilities, setFacilities] = useState<FacilityListResponse[]>(dummyFacilityData);
  const [programs, setPrograms] = useState<ProgramListResponse[]>(dummyProgramData);

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

      <s.SectionTitle className="horizontal-scroll-title">프로그램 목록</s.SectionTitle>
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

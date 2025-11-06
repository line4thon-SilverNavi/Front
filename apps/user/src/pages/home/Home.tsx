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
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const categories = ["전체", "건강", "문화", "치료"];

  const filteredPrograms = selectedCategory === "전체" 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

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
      <s.SectionTitle>내 주변 최신 소식</s.SectionTitle>
      <s.News>
        <s.NewsTitle>
          <span style={{fontSize:"0.85rem"}}>🎉</span> 신규 프로그램 안내
        </s.NewsTitle>
        <s.NewsInfo>
          11월 특별 프로그램이 개설 되었습니다.
          <s.MoreInfo>
            더보기
            <img src={"/img/home/arrow-right.png"}/>
          </s.MoreInfo>
        </s.NewsInfo>
      </s.News>

      <s.SectionTitle className="withMoreInfo">
        이번 주 우리 동네 프로그램
      <s.MoreInfo>
            더보기
            <img src={"/img/home/arrow-right.png"}/>
      </s.MoreInfo>
      </s.SectionTitle>
      
      <s.CategoryButtons>
        {categories.map((category) => (
          <s.CategoryButton
            key={category}
            $isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </s.CategoryButton>
        ))}
      </s.CategoryButtons>

      <s.Programs>
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program) => (
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

      <s.SectionTitle className="withMoreInfo">
        가까운 복지시설
        <s.MoreInfo>
            더보기
            <img src={"/img/home/arrow-right.png"}/>
      </s.MoreInfo>
      </s.SectionTitle>
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

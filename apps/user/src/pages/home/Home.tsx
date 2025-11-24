import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@layouts/DefaultLayout";
import Header from "@components/common/Header";
import NavBar from "@components/common/NavBar";
import * as s from "../Main_styled";
import FacilityCard from "@components/facility/facilityCard";
import ProgramCard from "@components/program/programCard";
import CardList from "@components/common/CardList";
import { getFacilityList, type FacilityListResponse } from "@apis/facility/facilityList";
import { getProgramList, type ProgramListResponse } from "@apis/program/programList";
import { dummyFacilityData } from "@apis/dummy/facilityDummy";
import { dummyProgramData } from "@apis/dummy/programDummy";
import { patchLocation } from "@apis/home/patchLocation";
import CategoryMap from "@components/common/CategoryMap";

const Home = () => {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState<FacilityListResponse[]>(dummyFacilityData);
  const [programs, setPrograms] = useState<ProgramListResponse[]>(dummyProgramData);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const locationSentRef = useRef(false);

  const categories = ["전체", "건강", "문화", "치료"];

  const filteredPrograms = selectedCategory === "전체" 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  useEffect(() => {
    const initializeData = async () => {
      // 최초 1회만 위치 정보 전송 (고정 좌표)
      if (!locationSentRef.current) {
        try {
          await patchLocation({
            latitude: "37.6154147804327",
            longitude: "127.013565764354",
          });
          locationSentRef.current = true;
          console.log("✅ 위치 정보 전송 완료 (고정 좌표)");
        } catch (error) {
          console.error("❌ 위치 정보 전송 실패:", error);
        }
      }

      // 위치 정보 전송 후 시설/프로그램 목록 불러오기
      try {
        const [facilitiesData, programsData] = await Promise.all([
          getFacilityList(),
          getProgramList()
        ]);

        if (facilitiesData && facilitiesData.length > 0) {
          setFacilities(facilitiesData.slice(0, 3));
        }

        if (programsData && programsData.length > 0) {
          setPrograms(programsData.slice(0, 3));
        }
      } catch (error) {
        console.error("목록 불러오기 실패:", error);
        // API 실패 시 더미 데이터 유지
      }
    };

    initializeData();
  }, []);

  return (
    <DefaultLayout header={<Header />} footer={<NavBar />}>
      <s.HomeWrapper>
        <s.SectionTitle>내 주변 최신 소식</s.SectionTitle>
      <s.News onClick={() => navigate("/program")}>
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
      <s.MoreInfo onClick={() => navigate("/program")}>
            더보기
            <img src={"/img/home/arrow-right.png"}/>
      </s.MoreInfo>
      </s.SectionTitle>
      
      <CategoryMap 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <CardList
        items={filteredPrograms}
        renderCard={(program) => (
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
        )}
        direction="horizontal"
      />

      <s.SectionTitle className="withMoreInfo">
        가까운 복지시설
        <s.MoreInfo onClick={() => navigate("/nearfacility")}>
            더보기
            <img src={"/img/home/arrow-right.png"}/>
      </s.MoreInfo>
      </s.SectionTitle>

      <CardList
        items={facilities}
        renderCard={(facility) => (
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
        )}
        direction="horizontal"
      />


    </s.HomeWrapper>
    </DefaultLayout>
  );
};

export default Home;

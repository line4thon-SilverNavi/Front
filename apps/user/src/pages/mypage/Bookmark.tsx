import styled from "styled-components";
import TabContainer from "@components/common/TabContainer";
import DefaultLayout from "@layouts/DefaultLayout";
import CommonHeader from "@components/common/CommonHeader";
import NavBar from "@components/common/NavBar";
import CardList from "@components/common/CardList";
import ProgramCard from "@components/program/programCard";
import FacilityCard from "@components/facility/facilityCard";
import { useState, useEffect } from "react";
import { getBookmarks } from "@apis/mypage/bookmark";
import type { BookmarkProgram, BookmarkFacility } from "@apis/mypage/bookmark";
import { dummyProgramData } from "@apis/dummy/programDummy";
import { dummyFacilityData } from "@apis/dummy/facilityDummy";

type TabType = "프로그램" | "시설";

export default function Bookmark(){
    const [activeTab, setActiveTab] = useState<TabType>("프로그램");
    const [programs, setPrograms] = useState<BookmarkProgram[]>([]);
    const [facilities, setFacilities] = useState<BookmarkFacility[]>([]);
    const [programCount, setProgramCount] = useState(0);
    const [facilityCount, setFacilityCount] = useState(0);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const data = await getBookmarks();
                if (data && data.results) {
                    setPrograms(data.results.programs);
                    setFacilities(data.results.facilities);
                    setProgramCount(data.programCount);
                    setFacilityCount(data.facilityCount);
                } else {
                    // API 응답이 없을 때 더미 데이터 사용
                    useDummyData();
                }
            } catch (error) {
                console.error("북마크 데이터를 불러오는데 실패했습니다:", error);
                // API 실패 시 더미 데이터 사용
                useDummyData();
            }
        };

        const useDummyData = () => {
            const bookmarkedPrograms = dummyProgramData
                .filter(p => p.bookmarked)
                .map(p => ({
                    programId: p.programId,
                    programName: p.programName || "",
                    location: p.location || "",
                    category: p.category || "",
                    date: p.date || "",
                    dayOfWeek: p.dayOfWeek || "",
                    startTime: p.startTime || "",
                    endTime: p.endTime || "",
                    currentApplicants: p.currentApplicants,
                    capacity: p.capacity,
                    fee: p.fee || "",
                    thumbnail: p.thumbnail,
                    bookmarked: p.bookmarked
                }));
            
            const bookmarkedFacilities = dummyFacilityData
                .filter(f => f.bookmarked)
                .map(f => ({
                    facilityId: f.facilityId,
                    name: f.name || "",
                    thumbnail: f.thumbnail,
                    distanceKm: f.distanceKm,
                    averageRating: f.averageRating,
                    reviewCount: f.reviewCount,
                    operatingHours: f.operatingHours,
                    phoneNumber: f.phoneNumber || "",
                    category: f.category,
                    bookmarked: f.bookmarked
                }));
            
            setPrograms(bookmarkedPrograms);
            setFacilities(bookmarkedFacilities);
            setProgramCount(bookmarkedPrograms.length);
            setFacilityCount(bookmarkedFacilities.length);
        };

        fetchBookmarks();
    }, []);

    const resultCount = activeTab === "프로그램" ? programCount : facilityCount;

    return(
        <DefaultLayout 
            header={<CommonHeader title="찜한 목록" />}
            footer={<NavBar />}>
        
        <Container>
            <TabContainer 
                tabs={["프로그램", "시설"]} 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
            />
            <Count>
                총 {resultCount}개
            </Count>

            {resultCount === 0 ? (
                <EmptyState>
                    <img src="/img/mypage/heart-gray.png" style={{width:"64px", height:"64px"}}/>
                    <h1>찜한 프로그램이 없습니다</h1>
                    관심있는 프로그램을 찜해보세요
                </EmptyState>
            ) : activeTab === "프로그램" ? (
                <CardList
                    items={programs}
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
                    direction="vertical"
                />
            ) : (
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
                    direction="vertical"
                />
            )}
        </Container>
        </DefaultLayout>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Count = styled.div`
    ${({ theme }) => theme.fonts.title1};
    color: ${({ theme }) => theme.colors.blue01};
    padding: 1rem 0;
`;

const EmptyState = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 9rem;
    gap: 1rem;
    h1{
        ${({ theme }) => theme.fonts.heading2};
        color: ${({ theme }) => theme.colors.gray07};
    }
`;
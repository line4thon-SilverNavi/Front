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
                if (data) {
                    setPrograms(data.results.programs);
                    setFacilities(data.results.facilities);
                    setProgramCount(data.programCount);
                    setFacilityCount(data.facilityCount);
                }
            } catch (error) {
                console.error("북마크 데이터를 불러오는데 실패했습니다:", error);
            }
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
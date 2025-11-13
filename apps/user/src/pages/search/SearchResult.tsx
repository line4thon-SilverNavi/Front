import { useSearchParams } from "react-router-dom";
import DefaultLayout from "@layouts/DefaultLayout";
import SearchHeader from "@components/search/SearchHeader";
import TabContainer from "@components/common/TabContainer";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { searchPrograms, searchFacilities, type ProgramSearchResult, type FacilitySearchResult } from "@apis/search/search";
import ProgramCard from "@components/program/programCard";
import FacilityCard from "@components/facility/facilityCard";
import CardList from "@components/common/CardList";

type TabType = "프로그램" | "시설";

export default function SearchResult(){
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const [activeTab, setActiveTab] = useState<TabType>("프로그램");
    const [programs, setPrograms] = useState<ProgramSearchResult[]>([]);
    const [facilities, setFacilities] = useState<FacilitySearchResult[]>([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (keyword) {
                const [programResults, facilityResults] = await Promise.all([
                    searchPrograms(keyword),
                    searchFacilities(keyword)
                ]);
                setPrograms(programResults);
                setFacilities(facilityResults);
            }
        };
        fetchSearchResults();
    }, [keyword]);

    const currentResults = activeTab === "프로그램" ? programs : facilities;
    const resultCount = currentResults.length;

    return(
        <DefaultLayout 
            header={<SearchHeader />}>
        <Container>
            <TabContainer 
                tabs={["프로그램", "시설"]} 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
            />
            <Count>
                총 {resultCount}개
            </Count>
            
            <ResultContainer>
                {resultCount === 0 ? (
                    <EmptyState>검색 결과가 없습니다.</EmptyState>
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
            </ResultContainer>
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

const ResultContainer = styled.div`
    padding: 0 1rem;
`;

const EmptyState = styled.div`
    ${({ theme }) => theme.fonts.body2};
    color: ${({ theme }) => theme.colors.gray04};
    text-align: center;
    padding: 4rem 0;
`;

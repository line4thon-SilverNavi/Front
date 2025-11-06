import { useEffect, useState } from "react";
import * as s from "./FacilityMain_styled";
import FacilityCard from "@components/facility/facilityCard";
import { getFacilityList, type FacilityListResponse } from "@apis/facility/facilityList";
import { dummyFacilityData } from "@apis/dummy/facilityDummy";
import { Button } from "@core/ui/button/Button";

const FacilityMain = () => {
    const [facilities, setFacilities] = useState<FacilityListResponse[]>(dummyFacilityData);
    const [selectedCategory, setSelectedCategory] = useState<string>("전체");
    const [sortOption, setSortOption] = useState<string>("거리순");
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

    const categories = ["전체", "요양병원", "요양원/요양센터", "주간보호센터"];
    const sortOptions = ["거리순", "평점순", "리뷰많은순"];

    const filteredFacility = selectedCategory === "전체" 
        ? facilities 
        : facilities.filter(facility => facility.category === selectedCategory);

    // 정렬 로직
    const sortedFacilities = [...filteredFacility].sort((a, b) => {
        switch (sortOption) {
            case "거리순":
                return a.distanceKm - b.distanceKm;
            case "평점순":
                return b.averageRating - a.averageRating;
            case "리뷰많은순":
                return b.reviewCount - a.reviewCount;
            default:
                return 0;
        }
    });

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

        fetchFacilities();
    }, []);

    return (
        <s.HomeWrapper>

        <s.SectionTitle className="withMoreInfo">
            요양보호시설
        </s.SectionTitle>

        <s.Selecting>
            <s.Total>총 {sortedFacilities.length}개</s.Total>
            <s.SortContainer>
                <s.SortButton onClick={() => setIsSortOpen(!isSortOpen)}>
                    {sortOption}
                    <img src={"/img/facility/arrow-down.png"}/>
                </s.SortButton>
                {isSortOpen && (
                    <s.SortDropdown>
                        {sortOptions.map((option) => (
                            <s.SortOption
                                key={option}
                                $isSelected={sortOption === option}
                                onClick={() => {
                                    setSortOption(option);
                                    setIsSortOpen(false);
                                }}
                            >
                                {option}
                            </s.SortOption>
                        ))}
                    </s.SortDropdown>
                )}
            </s.SortContainer>
        </s.Selecting>
        
        <s.CategoryButtons>
            {categories.map((category) => (
            <Button
                key={category}
                tone={selectedCategory === category ? "blue" : "gray"}
                variant={selectedCategory === category ? "subtle" : "subtle"}
                size="sm"
                radius="sm"
                typo={selectedCategory === category ? "label1" : "label2"}
                onClick={() => setSelectedCategory(category)}
                >
                        {category}
            </Button>
            ))}
        </s.CategoryButtons>

        <s.Facilities>
            {sortedFacilities.length > 0 ? (
            sortedFacilities.map((facility) => (
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

export default FacilityMain;

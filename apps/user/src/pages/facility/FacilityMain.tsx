import { useEffect, useState } from "react";
import * as s from "./FacilityMain_styled";
import FacilityCard from "@components/facility/facilityCard";
import { getFacilityList, type FacilityListResponse } from "@apis/facility/facilityList";
import { dummyFacilityData } from "@apis/dummy/facilityDummy";
import { Button } from "@core/ui/button/Button";

const FacilityMain = () => {
    const [facilities, setFacilities] = useState<FacilityListResponse[]>(dummyFacilityData);
    const [selectedCategory, setSelectedCategory] = useState<string>("전체");

    const categories = ["전체", "요양병원", "요양원/요양센터", "주간보호센터"];

    const filteredFacility = selectedCategory === "전체" 
        ? facilities 
        : facilities.filter(facility => facility.category === selectedCategory);

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
        <s.MoreInfo>
                더보기
                <img src={"/img/home/arrow-right.png"}/>
        </s.MoreInfo>
        </s.SectionTitle>
        
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
            {filteredFacility.length > 0 ? (
            filteredFacility.map((facility) => (
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

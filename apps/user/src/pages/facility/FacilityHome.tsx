import { useEffect, useState } from "react";
import * as s from "../Main_styled";
import FacilityCard from "@components/facility/facilityCard";
import CardList from "@components/common/CardList";
import { getFacilityList, type FacilityListResponse } from "@apis/facility/facilityList";
import { dummyFacilityData } from "@apis/dummy/facilityDummy";

const FacilityHome = () => {
    const [facilities, setFacilities] = useState<FacilityListResponse[]>(dummyFacilityData);

    useEffect(() => {
        const fetchFacilities = async () => {
        try {
            const data = await getFacilityList();
            if (data && data.length > 0) {
                setFacilities(data);
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

        <s.SectionTitle>
            가까운 복지시설
        </s.SectionTitle>

        <div style={{height:"0.8rem"}}>
        </div>
        
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


        </s.HomeWrapper>
    );
};

export default FacilityHome;

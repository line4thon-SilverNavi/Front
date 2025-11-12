import { useEffect, useState } from "react";
import DefaultLayout from "@layouts/DefaultLayout";
import Header from "@components/common/Header";
import NavBar from "@components/common/NavBar";
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
        <DefaultLayout header={<Header />} footer={<NavBar />}>
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
        </DefaultLayout>
    );
};

export default FacilityHome;

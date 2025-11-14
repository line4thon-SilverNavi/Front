import CommonHeader from "@components/common/CommonHeader";
import DefaultLayout from "@layouts/DefaultLayout";
import Map from "@components/location/Map";
import SetRange from "@components/location/SetRange";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Location(){
    const [latitude, setLatitude] = useState(37.5665); // 서울 기본값
    const [longitude, setLongitude] = useState(126.9780);
    const [radius, setRadius] = useState(5); // 기본 5km

    // 현재 위치 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다:", error);
                }
            );
        }
    }, []);

    const handleRangeConfirm = (newRange: number) => {
        setRadius(newRange);
    };

    return(
        <DefaultLayout
            header={<CommonHeader title="내 동네 설정" />}
            noPadding
        >
            <Container>
                <MapWrapper>
                    <Map 
                        latitude={latitude}
                        longitude={longitude}
                        radius={radius}
                    />
                </MapWrapper>
                
                <SetRangeWrapper>
                    <SetRange 
                        currentRange={radius}
                        onConfirm={handleRangeConfirm}
                    />
                </SetRangeWrapper>
            </Container>
        </DefaultLayout>
    )
}

const Container = styled.div`
    position: relative;
    height: calc(100vh - 60px);
`;

const MapWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const SetRangeWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
`;
import CommonHeader from "@components/common/CommonHeader";
import DefaultLayout from "@layouts/DefaultLayout";
import Map from "@components/location/Map";
import SetRange from "@components/location/SetRange";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Location(){
    const [latitude, setLatitude] = useState(37.6154147804327); // 고정 좌표
    const [longitude, setLongitude] = useState(127.013565764354); // 고정 좌표
    const [radius, setRadius] = useState(5); // 기본 5km

    // 고정 좌표 사용으로 현재 위치 조회 불필요
    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 setLatitude(position.coords.latitude);
    //                 setLongitude(position.coords.longitude);
    //             },
    //             (error) => {
    //                 console.error("위치 정보를 가져올 수 없습니다:", error);
    //             }
    //         );
    //     }
    // }, []);

    const handleRangeConfirm = (newRange: number) => {
        setRadius(newRange);
    };

    return(
        <DefaultLayout
            header={<CommonHeader title="내 동네 설정" />}
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
    align-items: center;
`;

const MapWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const SetRangeWrapper = styled.div`
    position: absolute;
    align-items: center;
    width: 101%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.2);
`;
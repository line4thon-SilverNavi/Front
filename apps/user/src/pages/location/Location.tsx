import CommonHeader from "@components/common/CommonHeader";
import DefaultLayout from "@layouts/DefaultLayout";
import Map from "@components/location/Map";
import SetRange from "@components/location/SetRange";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@core/ui/button";

export default function Location(){
    const [latitude, setLatitude] = useState(37.5665); // 서울 기본값
    const [longitude, setLongitude] = useState(126.9780);
    const [radius, setRadius] = useState(5); // 기본 5km
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [address, setAddress] = useState("위치를 가져오는 중...");

    // 현재 위치 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    // TODO: 좌표를 주소로 변환하는 API 호출
                    setAddress("현재 위치");
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다:", error);
                    setAddress("위치 정보를 가져올 수 없습니다");
                }
            );
        }
    }, []);

    const handleRangeConfirm = (newRange: number) => {
        setRadius(newRange);
    };

    return(
        <Wrapper>
       <Header><CommonHeader title="내 동네 설정" /></Header>
       
        
            <Container>
                <Map 
                    latitude={latitude}
                    longitude={longitude}
                    radius={radius}
                />
                
                <InfoSection>
                    <LocationInfo>
                        <LocationIcon src="/img/detail-page/location.png" />
                        <LocationText>{address}</LocationText>
                    </LocationInfo>
                    
                    <RangeButton onClick={() => setIsSheetOpen(true)}>
                        반경 {radius}km
                        <img src="/img/review/arrow.png" style={{ transform: 'rotate(90deg)' }} />
                    </RangeButton>
                </InfoSection>

                <ButtonContainer>
                    <Button tone="blue" radius="pill" size="lg" fullWidth>
                        설정 완료
                    </Button>
                </ButtonContainer>
            </Container>

            <SetRange 
                open={isSheetOpen}
                currentRange={radius}
                onClose={() => setIsSheetOpen(false)}
                onConfirm={handleRangeConfirm}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    
`;

const Header = styled.div`
    
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: calc(100vh - 60px);
    padding-bottom: 1rem;
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const LocationInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const LocationIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const LocationText = styled.span`
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.gray07};
`;

const RangeButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.gray02};
    border: 1px solid ${({ theme }) => theme.colors.gray03};
    border-radius: 12px;
    ${({ theme }) => theme.fonts.body2};
    color: ${({ theme }) => theme.colors.gray07};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${({ theme }) => theme.colors.gray03};
    }

    img {
        width: 8px;
        height: 4px;
    }
`;

const ButtonContainer = styled.div`
    margin-top: auto;
`;
import styled from "styled-components";
import { useFetchAddress } from "@hooks/UserLocation";
import { useState } from "react";

export default function Header(){
    const { address, error } = useFetchAddress();
    const [ noti, _setNoti] = useState(false);
    // _setNoti 추후 알림기능 백과 연동 후 사용

    return(
        <HeaderContainer>
            <UserLocationInfo>
                {error ? "위치를 불러올 수 없습니다" : address || "위치 정보 로딩 중..."}
            </UserLocationInfo>
            <ButtonContainer>
                <img src={"/img/header/search.png"} style={{height:"22px"}}/>
                <img src={noti ? "/img/header/notification-red.png" : "/img/header/notification.png"} style={{height:"26px", width:"25px"}}/>
            </ButtonContainer>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const UserLocationInfo = styled.div`
    display: flex;
    color: ${({ theme }) => theme.colors.blue01};
    ${({ theme }) => theme.fonts.title2};
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;

    img{
        cursor: pointer;
    }
`;
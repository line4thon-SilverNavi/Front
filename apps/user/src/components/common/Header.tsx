import styled from "styled-components";
import { useFetchAddress } from "@hooks/UserLocation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotificationCount } from "@apis/notification/countnoti";

export default function Header(){
    const { address, error } = useFetchAddress();
    const [noti, setNoti] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotificationCount = async () => {
            const count = await getNotificationCount();
            if (count && count > 0) {
                setNoti(true);
            }
        };

        fetchNotificationCount();
    }, []);

    return(
        <HeaderContainer>
            <UserLocationInfo>
                {error ? "서경대학교" : address || "위치 정보 로딩 중..."}
            </UserLocationInfo>
            <ButtonContainer>
                <img src={"/img/header/search.png"} style={{height:"22px"}}
                onClick={() => navigate("/search")}/>
                <img 
                    src={noti ? "/img/header/notification-red.png" : "/img/header/notification.png"} 
                    style={{height:"26px", width:"25px"}}
                    onClick={() => navigate("/notification")}
                />
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
import styled from "styled-components";
import { useState } from "react";

export default function NavBar(){
    const [ menu, setMenu] = useState("home");

    return(
        <NavBarContainer>
            <MenuBar>
                <MenuContainer onClick={() => setMenu("home")} $isActive={menu === "home"}>
                    <img src={menu === "home" ? "/img/navbar/home-blue.png" : "/img/navbar/home-gray.png"}/>
                    <MenuText $isActive={menu === "home"}>홈</MenuText>
                </MenuContainer>
                <MenuContainer onClick={() => setMenu("facility")} $isActive={menu === "facility"}>
                    <img src={menu === "facility" ? "/img/navbar/facility-blue.png" : "/img/navbar/facility-gray.png"} />
                    <MenuText $isActive={menu === "facility"}>시설</MenuText>
                </MenuContainer>
                <MenuContainer onClick={() => setMenu("calendar")} $isActive={menu === "calendar"}>
                    <img src={menu === "calendar" ? "/img/navbar/calendar-blue.png" : "/img/navbar/calendar-gray.png"}/>
                    <MenuText $isActive={menu === "calendar"}>캘린더</MenuText>
                </MenuContainer>
                <MenuContainer onClick={() => setMenu("mypage")} $isActive={menu === "mypage"}>
                    <img src={menu === "mypage" ? "/img/navbar/mypage-blue.png" : "/img/navbar/mypage-gray.png"}/>
                    <MenuText $isActive={menu === "mypage"}>마이</MenuText>
                </MenuContainer>
            </MenuBar>
        </NavBarContainer>
    )
}

const NavBarContainer = styled.div`
    display: flex;
    border-top: 2px solid ${({ theme }) => theme.colors.gray03};
    margin: 0 -1.36rem calc(-1.36rem - env(safe-area-inset-bottom));
    padding-bottom: 1.25rem;
    padding-top: 1rem;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 6rem;
`;

const MenuBar = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    gap: 0.5rem;
    margin-top: 0.25rem;
`;

const MenuContainer = styled.div<{ $isActive: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    
    img {
        width: 24px;
        height: 24px;
    }
`;

const MenuText = styled.span<{ $isActive: boolean }>`
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme, $isActive }) => $isActive ? theme.colors.blue01 : theme.colors.gray05};
    font-weight: ${({ $isActive }) => $isActive ? 600 : 400};
`;
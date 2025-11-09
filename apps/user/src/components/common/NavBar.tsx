import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar(){
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveMenu = () => {
        const path = location.pathname;
        if (path === "/") return "home";
        if (path.startsWith("/facility")) return "facility";
        if (path.startsWith("/calendar")) return "calendar";
        if (path.startsWith("/mypage")) return "mypage";
        return "home";
    };

    const activeMenu = getActiveMenu();

    const handleMenuClick = (path: string) => {
        navigate(path);
    };

    return(
        <NavBarContainer>
            <MenuBar>
                <MenuContainer onClick={() => handleMenuClick("/")} $isActive={activeMenu === "home"}>
                    <img src={activeMenu === "home" ? "/img/navbar/home-blue.png" : "/img/navbar/home-gray.png"}/>
                    <MenuText $isActive={activeMenu === "home"}>홈</MenuText>
                </MenuContainer>
                <MenuContainer onClick={() => handleMenuClick("/facility")} $isActive={activeMenu === "facility"}>
                    <img src={activeMenu === "facility" ? "/img/navbar/facility-blue.png" : "/img/navbar/facility-gray.png"} />
                    <MenuText $isActive={activeMenu === "facility"}>시설</MenuText>
                </MenuContainer>
                <MenuContainer onClick={() => handleMenuClick("/calendar")} $isActive={activeMenu === "calendar"}>
                    <img src={activeMenu === "calendar" ? "/img/navbar/calendar-blue.png" : "/img/navbar/calendar-gray.png"}/>
                    <MenuText $isActive={activeMenu === "calendar"}>캘린더</MenuText>
                </MenuContainer>
                <MenuContainer onClick={() => handleMenuClick("/mypage")} $isActive={activeMenu === "mypage"}>
                    <img src={activeMenu === "mypage" ? "/img/navbar/mypage-blue.png" : "/img/navbar/mypage-gray.png"}/>
                    <MenuText $isActive={activeMenu === "mypage"}>마이</MenuText>
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
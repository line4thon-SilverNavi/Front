import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Header = styled.div`
    display: flex;
    color: #A0D0FC;
    ${({ theme }) => theme.fonts.heading3};
    justify-content: center;
`;

export const CompleteProfile = styled.div<{ $hidden?: boolean }>`
    display: ${({ $hidden }) => ($hidden ? 'none' : 'flex')};
    flex-direction: column;
    background: #FFFCEB;
    border-radius: 10px;
    padding: 1.2rem 1rem;
    position: relative;
    border: 1px solid #FFD700;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ProfileTitle = styled.div`
    ${({ theme }) => theme.fonts.body3};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.gray07};
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 3rem;
    gap: 0.8rem;
`;

export const ProgressBarContainer = styled.div`
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.gray01};
    border-radius: 4px;
    overflow: hidden;
`;

export const ProgressBar = styled.div<{ $percentage: number }>`
    height: 100%;
    width: ${({ $percentage }) => `${Math.min($percentage, 100)}%`};
    background-color: #FFD700;
    border-radius: 4px;
    transition: width 0.3s ease;
`;

export const ProfileDescription = styled.p`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray05};
    margin: 0;
    line-height: 1.4;
`;

export const CompleteButton = styled.button`
    background: ${({ theme }) => theme.colors.gray01};
    border: 1px solid #FFD700;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray07};
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-top: 4px;
    justify-content: space-between;

    &:hover {
        background: ${({ theme }) => theme.colors.gray02};
    }
`;

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background: ${({ theme }) => theme.colors.blue01};
    border-radius: 12px;
    margin-bottom: 1rem;
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;


export const ProfileIcon = styled.div`
    width: 70px;
    height: 70px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }) => theme.fonts.heading1};
    color: ${({ theme }) => theme.colors.blue01};
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ProfileName = styled.div`
    ${({ theme }) => theme.fonts.heading2};
    color: white;

    @media (max-width: 335px) {
        ${({ theme }) => theme.fonts.heading3};
    }
`;

export const ProfileRole = styled.div`
    ${({ theme }) => theme.fonts.title2};
    color: white;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 1px 9px;

    @media (max-width: 335px) {
        ${({ theme }) => theme.fonts.title3};
    }
`;

export const ProfilePhone = styled.div`
    ${({ theme }) => theme.fonts.body3};
    color: rgba(255, 255, 255, 0.7);
`;

export const CareTargetSection = styled.div`
    margin: 1rem 0.5rem -0.3rem 0.5rem;
    padding: 0.8rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    border: 0.68px solid rgba(255, 255, 255, 0.2);
`;

export const CareTargetTitle = styled.div`
    ${({ theme }) => theme.fonts.title3};
    color: white;
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
`;

export const CareTargetGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.3rem 1rem;
`;

export const CareTargetItem = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CareTargetLabel = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: rgba(255, 255, 255, 0.7);
`;

export const CareTargetValue = styled.div`
    ${({ theme }) => theme.fonts.title3};
    color: white;
`;

export const MyActivity = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

export const Title = styled.h3`
    ${({ theme }) => theme.fonts.title1};
    color: ${({ theme }) => theme.colors.gray07};
    margin: 0;
`;

export const Card = styled.div<{ type: 'program' | 'bookmarked' | 'review' }>`
    background: white;
    border-radius: 12px;
    padding: 1.2rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 1 1px 1px rgba(0, 0, 0, 0.08);

    &:hover {
        background: ${({ theme }) => theme.colors.gray02};
    }
`;

export const CardLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
`;

export const CardTitle = styled.span`
    ${({ theme }) => theme.fonts.body2};
    color: ${({ theme }) => theme.colors.gray07};
`;

export const CardCount = styled.span`
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.blue01};
    min-width: 30px;
    text-align: center;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
`;

export const MenuList = styled.div<{ type: 'bookmark' | 'setting' }>`
    background: white;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray02};
    }

    &:hover {
        background: ${({ theme }) => theme.colors.gray01};
    }
`;

export const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    ${({ theme }) => theme.fonts.body2};
    color: ${({ theme }) => theme.colors.gray07};

    img {
        width: 24px;
        height: 24px;
    }
`;

export const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;


export const Red = styled.p`
    background-color: #FF6B6B;
    color: white;
    padding: 1px 5px;
    border-radius: 50px;
    ${({ theme }) => theme.fonts.caption};
`;

export const ActivityCard = styled.div`
    background: white;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    border: 1px solid ${({ theme }) => theme.colors.gray03};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
`;

export const ActivityCount = styled.div`
    ${({ theme }) => theme.fonts.heading2};
    color: #6AB0E3;
`;

export const ActivityLabel = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray05};
    text-align: center;
`;

export const ActivityContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
`;

export const LogoutButton = styled.button`
    background: white;
    ${({ theme }) => theme.fonts.title3};
    color: ${({ theme }) => theme.colors.signal};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem 0;
    width: 100%;
    justify-content: center;
    margin-bottom: 2rem;
    margin-top: 0.2rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
    border-radius: 10px;

    &:hover {
        opacity: 0.8;
    }
`;

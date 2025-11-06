import styled from "styled-components";

export const HomeWrapper = styled.div`
    color: ${({ theme }) => theme.colors.blue01};
    ${({ theme }) => theme.fonts.body1}
`;

export const SectionTitle = styled.h2`
    ${({ theme }) => theme.fonts.title1};
    color: ${({ theme }) => theme.colors.gray07};
    margin-bottom: 0.8rem;
    margin-top: 0.5rem;

    &.withMoreInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export const Facilities = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Programs = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    > * {
        flex: 0 0 270px; /* 카드 너비 고정 */
        scroll-snap-align: start;
    }
`;

export const News = styled.div`
    background-color: #FFFCEB;
    height: 5.5rem;
    border-radius: 10px;
    border: 1px solid #FFD700;
    padding: 1.1rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    cursor: pointer;
`;

export const NewsTitle = styled.div`
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.gray07};
    display: flex;
    gap: 0.4rem;
`;

export const NewsInfo = styled.div`
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray05};
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
`;

export const MoreInfo = styled.div`
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray05};
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    img{
        height: 8px;
        width: 4px;
    }
`;

export const CategoryButtons = styled.div`
    display: flex;
    gap: 0.7rem;
    margin-bottom: 1rem;
    overflow-x: auto;
    
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    > * {
        scroll-snap-align: start;
    }
`;

export const CategoryButton = styled.button<{ $isActive: boolean }>`
    ${({ theme, $isActive }) => $isActive ? theme.fonts.label1 : theme.fonts.label2};
    padding: 0.4rem 1rem;
    border-radius: 5px;
    border: none;
    background-color: ${({ theme, $isActive }) => $isActive ? theme.colors.blue02 : theme.colors.gray02};
    color: ${({ theme, $isActive }) => $isActive ? theme.colors.blue01 : theme.colors.gray06};
    cursor: pointer;
    white-space: nowrap;
`;

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
    margin-top: 1.6rem;
  }
`;

export const Facilities = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  > * {
    flex: 0 0 270px; 
    scroll-snap-align: start;
  }
`;

export const FacilitiesVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Programs = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  > * {
    flex: 0 0 270px; 
    scroll-snap-align: start;
  }
`;

export const News = styled.div`
  background-color: #FFFCEB;
  height: 5.5rem;
  border-radius: 10px;
  border: 1px solid #FFD700;
  padding: 1.1rem 1.2rem;
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

  @media (max-width: 375px) {
    ${({ theme }) => theme.fonts.caption};
  }
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
    box-shadow: none;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  > * {
    scroll-snap-align: start;
  }
  white-space: nowrap;
`;

export const Selecting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Total = styled.div`
  ${({ theme }) => theme.fonts.title1};
  color: ${({ theme }) => theme.colors.blue01};
`;

export const SortContainer = styled.div`
  position: relative;
`;

export const SortButton = styled.button`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray04};
  background: ${({ theme }) => theme.colors.gray01};
  border: 1px solid ${({theme}) => theme.colors.gray03};
  border-radius: 5px;
  box-shadow: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.2rem 0.2rem 0.2rem 0.7rem;
  
  img {
    width: 19px;
    height: 19px;
  }
`;

export const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.gray01};
  border: 1px solid ${({ theme }) => theme.colors.gray03};
  border-radius: 5px;
  overflow: hidden;
  z-index: 100;
  width: 100%;
`;

export const SortOption = styled.div<{ $isSelected: boolean }>`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme, $isSelected }) => $isSelected ? theme.colors.blue01 : theme.colors.gray06};
  background: ${({ theme, $isSelected }) => $isSelected ? theme.colors.blue03 : theme.colors.gray01};
  padding: 0.3rem 0.3rem 0.2rem 0.7rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray02};
  }
`;

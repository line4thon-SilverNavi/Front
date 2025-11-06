import styled from "styled-components";

export const HomeWrapper = styled.div`
  color: ${({ theme }) => theme.colors.blue01};
  ${({ theme }) => theme.fonts.body1}
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => theme.fonts.title1};
  color: ${({ theme }) => theme.colors.gray07};
  margin-bottom: 1rem;
  margin-top: 2rem;

  &:first-child {
    margin-top: 0;
  }

  &.horizontal-scroll-title {
    padding: 0 1.5rem;
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

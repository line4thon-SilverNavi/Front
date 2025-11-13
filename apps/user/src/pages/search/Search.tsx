import SearchHeader from "@components/search/SearchHeader";
import DefaultLayout from "@layouts/DefaultLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 10;

// 임시 인기 검색어 데이터
const HOT_KEYWORDS = [
    "치매예방",
    "노래교실",
    "요양병원",
    "주간보호센터"
];

export default function Search(){
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 로컬스토리지에서 최근 검색어 불러오기
        const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    const handleKeywordClick = (keyword: string) => {
        // 최근 검색어에 추가
        const updated = [keyword, ...recentSearches.filter(k => k !== keyword)].slice(0, MAX_RECENT_SEARCHES);
        setRecentSearches(updated);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
        
        // 검색 결과 페이지로 이동
        navigate(`/search/result?keyword=${encodeURIComponent(keyword)}`);
    };

    const handleClearAll = () => {
        setRecentSearches([]);
        localStorage.removeItem(RECENT_SEARCHES_KEY);
    };

    return(
        <DefaultLayout header={<SearchHeader />}>
            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>
                            <img src="/img/history/clock-blue.png"/>
                            최근 검색어
                        </SectionTitle>
                        {recentSearches.length > 0 && (
                            <ClearButton onClick={handleClearAll}>전체 삭제</ClearButton>
                        )}
                    </SectionHeader>
                    <RecentContainer>
                        {recentSearches.length === 0 ? (
                            <EmptyMessage>최근 검색어가 없습니다.</EmptyMessage>
                        ) : (
                            recentSearches.map((keyword) => (
                                    <RecentTag onClick={() => handleKeywordClick(keyword)}>
                                        {keyword}
                                    </RecentTag>
                            ))
                        )}
                    </RecentContainer>
                </Section>

                <Section>
                    <SectionHeader>
                        <SectionTitle>
                            <img src="/img/search/chart.png" style={{width:"16px", height:"16px"}}/>
                            인기 검색어
                        </SectionTitle>
                    </SectionHeader>
                    <KeywordContainer>
                        {HOT_KEYWORDS.map((keyword, index) => (
                            <KeywordItem key={index} onClick={() => handleKeywordClick(keyword)}>
                                <KeywordText>
                                    <Num>{index + 1}</Num>
                                    {keyword}
                                </KeywordText>
                            </KeywordItem>
                        ))}
                    </KeywordContainer>
                </Section>
            </Container>
        </DefaultLayout>
    );
}

const Container = styled.div`
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.gray07};
    display: flex;
    align-items: center;
    gap: 14px;
    img{
        width: 18px;
        height: 18px;
    }
`;

const ClearButton = styled.button`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray05};
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    
    &:hover {
        color: ${({ theme }) => theme.colors.gray07};
    }
`;

const KeywordContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const EmptyMessage = styled.div`
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray04};
    text-align: center;
    padding: 1rem 0;
    display: flex;
    width: 100%;
    justify-content: center;
`;

const KeywordItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-left: 1rem;
    
    &:hover {
        background: ${({ theme }) => theme.colors.gray01};
    }
`;

const Num = styled.div`
    ${({ theme }) => theme.fonts.title3};
    color: ${({ theme }) => theme.colors.blue01};
`

const KeywordText = styled.div`
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray07};
    flex: 1;
    display: flex;
    gap: 14px;
`;


const RecentTag = styled.div`
    ${({ theme }) => theme.fonts.label2};
    color: ${({ theme }) => theme.colors.blue01};
    background: ${({ theme }) => theme.colors.blue03};
    width: fit-content;
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    cursor: pointer;
`;

const RecentContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

import { useState, useEffect } from "react";
import styled from "styled-components";
import type { ConsultHistoryData } from "@apis/history/history";
import { getConsultHistory } from "@apis/history/history";
import CategoryMap from "@components/common/CategoryMap";


export default function ConsultHistory(){
    const [consultData, setConsultData] = useState<ConsultHistoryData | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>("전체");

    const statusCategories = ["전체", "대기중", "확인됨", "완료"];

    const filteredConsults = selectedStatus === "전체" 
        ? consultData?.consults || []
        : consultData?.consults.filter(consult => consult.consultStatus === selectedStatus) || [];

    useEffect(() => {
        const fetchConsults = async () => {
            try {
                const data = await getConsultHistory();
                console.log("받아온 상담 데이터:", data);
                if (data) {
                    setConsultData(data);
                }
            } catch (error) {
                console.error("상담 신청 내역 불러오기 실패:", error);
            }
        };

        fetchConsults();
    }, []);

    return(
        <Container>
            <CategoryMap 
                categories={statusCategories}
                selectedCategory={selectedStatus}
                onCategoryChange={setSelectedStatus}
            />

        <InfoBox>
            <InfoTitle>총 상담 신청</InfoTitle>
            <Total>0{consultData?.totalCount}
                <p>건</p>
            </Total>
            <CountContainer>
                <MiniContainer>
                    <p>대기중</p>
                    {consultData?.waitingCount};
                </MiniContainer>
                <MiniContainer>
                    <p>확인됨</p>
                    {consultData?.confirmedCount};
                </MiniContainer>
                <MiniContainer>
                    <p>완료</p>
                    {consultData?.completedCount};
                </MiniContainer>
            </CountContainer>
        </InfoBox>

        </Container>
    );
}

const Container = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: column;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.blue03};
    width: 100%;
    border-radius: 15px;
    padding: 1rem 1.3rem;
    border: 1.5px solid ${({ theme }) => theme.colors.blue01};
`;

const InfoTitle = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray06};
`;

const Total = styled.div`
    display: flex;
    gap: 6px;
    font-size: 32px;
    font-weight: 600;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray06};

    p{
        ${({ theme }) => theme.fonts.body1};
    }
`;

const CountContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const MiniContainer = styled.div`
    display: flex;
    flex-direction: column;
    ${({ theme }) => theme.fonts.title1};
    color: ${({ theme }) => theme.colors.gray06};
    p{
        ${({ theme }) => theme.fonts.caption};
        margin: 0;
    }
`;

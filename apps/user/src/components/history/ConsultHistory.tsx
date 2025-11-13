import { useState, useEffect } from "react";
import styled from "styled-components";
import type { ConsultHistoryData } from "@apis/history/history";
import { getConsultHistory } from "@apis/history/history";
import CategoryMap from "@components/common/CategoryMap";
import { useFormatDate } from "@hooks/program/ProcessingTime";


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
                <Total>{consultData?.totalCount || 0}
                    <p>건</p>
                </Total>
                <CountContainer>
                    <MiniContainer>
                        <p>대기중</p>
                        {consultData?.waitingCount || 0}
                    </MiniContainer>
                    <MiniContainer>
                        <p>확인됨</p>
                        {consultData?.confirmedCount || 0}
                    </MiniContainer>
                    <MiniContainer>
                        <p>완료</p>
                        {consultData?.completedCount || 0}
                    </MiniContainer>
                </CountContainer>
            </InfoBox>

            {filteredConsults.length === 0 ? (
                <EmptyState>
                    <img src="/img/history/chat.png" style={{width:"64px", height:"64px"}} />
                    <EmptyText>
                        상담 내역이 없습니다
                        <p>시설 상세 페이지에서 상담을 신청해보세요</p>
                    </EmptyText>
                </EmptyState>
            ) : (
                <ConsultList>
                    {filteredConsults.map((consult) => (
                        <ConsultCard key={consult.id}>
                            <CardHeader>
                                <Left>
                                <ConsultBadge $status={consult.consultCategory}>
                                    {consult.consultCategory}
                                </ConsultBadge>
                                <StatusBadge $status={consult.consultStatus}>
                                    {consult.consultStatus === "대기중" && (
                                        <img src="/img/history/clock-orange.png" style={{width:"12px", height:"12px"}} />
                                    )}
                                    {consult.consultStatus === "확인됨" && (
                                        <img src="/img/history/complete-blue.png" style={{width:"12px", height:"12px"}} />
                                    )}
                                    {consult.consultStatus}
                                </StatusBadge>
                                </Left>
                                <ConsultDate>{useFormatDate(consult.createdAt)}</ConsultDate>
                            </CardHeader>
                            <CardContainer>
                                <img src="/img/history/facility.png" style={{width:"48px", height:"48px"}} />
                                <CardInfo>
                                    <FacilityName>{consult.facilityName}</FacilityName>
                                    <ConsultDetail>{consult.content}</ConsultDetail>
                                </CardInfo>
                            </CardContainer>
                        </ConsultCard>
                    ))}
                </ConsultList>
            )}

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

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 40px 20px;
    gap: 16px;

    img {
        width: 80px;
        height: 80px;
        opacity: 0.5;
    }
`;

const EmptyText = styled.p`
    ${({ theme }) => theme.fonts.title1};
    color: ${({ theme }) => theme.colors.gray07};
    margin: 0;
    p{
        ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray04};
    }
`;

const ConsultList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 1.5rem;
`;

const ConsultCard = styled.div`
    background: ${({ theme }) => theme.colors.gray01};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray03};
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Left = styled.div`
    display: flex;
    gap: 8px;
`;

const StatusBadge = styled.span<{ $status: string }>`
    ${({ theme }) => theme.fonts.caption};
    padding: 4px 12px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    background: ${({ $status, theme }) => {
        if ($status === "대기중") return "#FFF3E0";
        if ($status === "확인됨") return theme.colors.blue03;
        if ($status === "완료") return theme.colors.gray02;
        return theme.colors.gray02;
    }};
    color: ${({ $status, theme }) => {
        if ($status === "대기중") return "#F57C00";
        if ($status === "확인됨") return theme.colors.blue01;
        if ($status === "완료") return theme.colors.gray05;
        return theme.colors.gray05;
    }};
`;

const ConsultBadge = styled.span<{ $status: string }>`
    ${({ theme }) => theme.fonts.caption};
    padding: 4px 12px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.blue03};
    color: ${({ theme }) => theme.colors.blue01};
`;

const ConsultDate = styled.span`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray05};
`;

const FacilityName = styled.div`
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.gray07};
`;

const ConsultDetail = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray04};
`;

const CardContainer = styled.div`
    display: flex;
    gap: 0.7rem;
`;

const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
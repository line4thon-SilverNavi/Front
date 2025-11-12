import DefaultLayout from "@layouts/DefaultLayout";
import HeaderHistory from "@components/history/HeaderHistory";
import NavBar from "@components/common/NavBar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getProgramHistory, type ProgramHistoryData } from "@apis/history/history";

type TabType = "신청 목록" | "상담 내역";
type ScheduleType = "예정" | "완료";

export default function History(){
    const [activeTab, setActiveTab] = useState<TabType>("신청 목록");
    const [scheduleType, setScheduleType] = useState<ScheduleType>("예정");
    const [historyData, setHistoryData] = useState<ProgramHistoryData | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getProgramHistory();
            if (data) {
                setHistoryData(data);
            }
        };
        fetchHistory();
    }, []);

    return(
        <DefaultLayout header={<HeaderHistory />} footer={<NavBar />}>
            <TabContainer>
                <Tab 
                    $isActive={activeTab === "신청 목록"} 
                    onClick={() => setActiveTab("신청 목록")}
                >
                    신청 목록
                </Tab>
                <Tab 
                    $isActive={activeTab === "상담 내역"} 
                    onClick={() => setActiveTab("상담 내역")}
                >
                    상담 내역
                </Tab>
            </TabContainer>

            <ContentContainer>
                {activeTab === "신청 목록" ? (
                    <div>
                        <ScheduleToggleContainer>
                            <ScheduleToggle
                                $isActive={scheduleType === "예정"}
                                onClick={() => setScheduleType("예정")}
                            >
                                <Title>
                                    <img src={scheduleType === "예정" ? "/img/history/clock-blue.png" : "/img/history/clock-gray.png"}
                                    style={{width:"16px", height:"16px"}}/>
                                    예정
                                </Title>
                                {historyData?.scheduledCount || 0}개
                            </ScheduleToggle>
                            <ScheduleToggle
                                $isActive={scheduleType === "완료"}
                                onClick={() => setScheduleType("완료")}
                            >
                                <Title>
                                    <img src={scheduleType === "완료" ? "/img/history/complete-blue.png" : "/img/history/complete-gray.png"}
                                    style={{width:"16px", height:"16px"}}/>
                                    완료
                                </Title>
                                {historyData?.completedCount || 0}개
                            </ScheduleToggle>
                        </ScheduleToggleContainer>
                        
                        {scheduleType === "예정" ? (
                            <div>예정된 신청 목록</div>
                        ) : (
                            <div>완료된 신청 목록</div>
                        )}
                    </div>
                ) : (
                    <div>상담 내역 내용</div>
                )}
            </ContentContainer>
        </DefaultLayout>
    );
}

const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray03};
`;

const Tab = styled.button<{ $isActive: boolean }>`
    flex: 1;
    padding: 10px;
    background: none;
    border: none;
    border-bottom: 5px solid ${({ $isActive, theme }) => 
        $isActive ? theme.colors.blue01 : 'transparent'};
    color: ${({ $isActive, theme }) => 
        $isActive ? theme.colors.gray07: theme.colors.gray04};
    ${({ theme }) => theme.fonts.body1};
    ${({ $isActive, theme }) => 
            $isActive ? theme.fonts.body1 : theme.fonts.label2};
    cursor: pointer;
    transition: all 0.2s;
    -webkit-tap-highlight-color: transparent;
    box-shadow: none;
    outline: none;

    &:hover {
        background: none;
        box-shadow: none;
    }

    &:active {
        background: none;
        box-shadow: none;
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

const ContentContainer = styled.div`

`;

const ScheduleToggleContainer = styled.div`
    display: flex;
    gap: 24px;
    margin: 20px 0;
`;

const ScheduleToggle = styled.button<{ $isActive: boolean }>`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: 8px 14px 6px 14px;
    border-radius: 8px;
    gap: 2px;
    ${({ theme }) => theme.fonts.heading2};
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: none;
    outline: none;
    border: ${({ $isActive, theme }) => 
        $isActive ? `1px solid ${theme.colors.blue01}` : 'none'};

    background: ${({ $isActive, theme }) => 
        $isActive ? theme.colors.blue03 : theme.colors.gray02};
    color: ${({ $isActive, theme }) => 
        $isActive ? theme.colors.blue01 : theme.colors.gray06};

    &:hover {
        opacity: 0.8;
        box-shadow: none;
    }

    &:active {
        box-shadow: none;
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }

`;

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    ${({ theme }) => theme.fonts.caption};
`

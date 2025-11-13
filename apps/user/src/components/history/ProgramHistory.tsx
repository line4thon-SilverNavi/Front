import { useState } from "react";
import styled from "styled-components";
import type { ProgramHistoryData } from "@apis/history/history";
import CardList from "@components/common/CardList";
import ProgramCard from "@components/program/programCard";
// import { dummyProgramHistory } from "@apis/dummy/historyDummy";

type ScheduleType = "예정" | "완료";

interface ProgramHistoryProps {
    historyData: ProgramHistoryData | null;
}

export default function ProgramHistory({ historyData }: ProgramHistoryProps) {
    const [scheduleType, setScheduleType] = useState<ScheduleType>("예정");
    
    // 실제 데이터 사용 (더미 데이터를 사용하려면 아래 줄의 주석을 해제하고 historyData를 dummyProgramHistory로 변경)
    // const data = dummyProgramHistory;
    const data = historyData;

    return (
        <>
            <ScheduleToggleContainer>
                <ScheduleToggle
                    $isActive={scheduleType === "예정"}
                    onClick={() => setScheduleType("예정")}
                >
                    <InfoDone>
                        <img src={scheduleType === "예정" ? "/img/history/clock-blue.png" : "/img/history/clock-gray.png"}
                        style={{width:"16px", height:"16px"}}/>
                        예정
                    </InfoDone>
                    {data?.scheduledCount || 0}개
                </ScheduleToggle>
                <ScheduleToggle
                    $isActive={scheduleType === "완료"}
                    onClick={() => setScheduleType("완료")}
                >
                    <InfoDone>
                        <img src={scheduleType === "완료" ? "/img/history/complete-blue.png" : "/img/history/complete-gray.png"}
                        style={{width:"18px", height:"18px"}}/>
                        완료
                    </InfoDone>
                    {data?.completedCount || 0}개
                </ScheduleToggle>
            </ScheduleToggleContainer>
            
            {scheduleType === "예정" ? (
                <>
                    <Title>
                        <img src="/img/history/clock-blue.png" style={{width:"20px", height:"20px"}}/>
                        예정된 프로그램
                    </Title>
                    <CardList
                        items={data?.programs.filter(p => p.status === "예정") || []}
                        renderCard={(program) => (
                            <ProgramCard
                                key={program.programId}
                                programId={program.programId}
                                programName={program.programName}
                                category={program.category}
                                date={program.date}
                                dayOfWeek={program.dayOfWeek}
                                location={program.location}
                                startTime={program.startTime}
                                endTime={program.endTime}
                                currentApplicants={program.currentApplicants}
                                capacity={program.capacity}
                                fee={program.fee}
                                thumbnail={program.thumbnail}
                                bookmarked={program.bookmarked}
                                done={program.status}
                            />
                        )}
                        direction="vertical"
                    />
                </>
            ) : (
                <>
                    <Title>
                        <img src="/img/history/complete-blue.png" style={{width:"20px", height:"20px"}}/>
                        완료된 프로그램
                    </Title>
                    <CardList
                        items={data?.programs.filter(p => p.status === "완료") || []}
                        renderCard={(program) => (
                            <ProgramCard
                                key={program.programId}
                                programId={program.programId}
                                programName={program.programName}
                                category={program.category}
                                date={program.date}
                                dayOfWeek={program.dayOfWeek}
                                location={program.location}
                                startTime={program.startTime}
                                endTime={program.endTime}
                                currentApplicants={program.currentApplicants}
                                capacity={program.capacity}
                                fee={program.fee}
                                thumbnail={program.thumbnail}
                                bookmarked={program.bookmarked}
                                done={program.status}
                            />
                        )}
                        direction="vertical"
                    />
                </>
            )}
        </>
    );
}

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

const InfoDone = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    ${({ theme }) => theme.fonts.caption};
`;

const Title = styled.div`
    display: flex;
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.gray07};
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
`;

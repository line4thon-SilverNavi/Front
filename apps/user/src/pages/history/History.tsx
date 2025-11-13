import DefaultLayout from "@layouts/DefaultLayout";
import HeaderHistory from "@components/history/HeaderHistory";
import NavBar from "@components/common/NavBar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getProgramHistory, type ProgramHistoryData } from "@apis/history/history";
import ProgramHistory from "@components/history/ProgramHistory";
import ConsultHistory from "@components/history/ConsultHistory";

type TabType = "신청 목록" | "상담 내역";

export default function History(){
    const [activeTab, setActiveTab] = useState<TabType>("신청 목록");
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
                    <ProgramHistory historyData={historyData} />
                ) : (
                    <>
                    <ConsultHistory />
                    </>
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
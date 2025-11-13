import DefaultLayout from "@layouts/DefaultLayout";
import HeaderHistory from "@components/history/HeaderHistory";
import NavBar from "@components/common/NavBar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getProgramHistory, type ProgramHistoryData } from "@apis/history/history";
import ProgramHistory from "@components/history/ProgramHistory";
import ConsultHistory from "@components/history/ConsultHistory";
import TabContainer from "@components/common/TabContainer";

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
            <TabContainer 
                tabs={["신청 목록", "상담 내역"]} 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
            />

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

const ContentContainer = styled.div`

`;
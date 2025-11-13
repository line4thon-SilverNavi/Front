import styled from "styled-components";
import TabContainer from "@components/common/TabContainer";
import DefaultLayout from "@layouts/DefaultLayout";
import CommonHeader from "@components/common/CommonHeader";
import NavBar from "@components/common/NavBar";
import { useState } from "react";

type TabType = "프로그램" | "시설";

export default function Bookmark(){
    const [activeTab, setActiveTab] = useState<TabType>("프로그램");

    return(
        <DefaultLayout 
            header={<CommonHeader title="찜한 목록" />}
            footer={<NavBar />}>
        
        <Container>
            <TabContainer 
                tabs={["프로그램", "시설"]} 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
            />
            <Count>
                총 {resultCount}개
            </Count>
        </Container>
        </DefaultLayout>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Count = styled.div`
    ${({ theme }) => theme.fonts.title1};
    color: ${({ theme }) => theme.colors.blue01};
    padding: 1rem 0;
`;
import { useEffect, useState } from "react";
import DefaultLayout from "@layouts/DefaultLayout";
import Header from "@components/common/Header";
import NavBar from "@components/common/NavBar";
import * as s from "../Main_styled";
import ProgramCard from "@components/program/programCard";
import CardList from "@components/common/CardList";
import { getProgramList, type ProgramListResponse } from "@apis/program/programList";
import { dummyProgramData } from "@apis/dummy/programDummy";
import { Button } from "@core/ui/button/Button";

const ProgramHome = () => {
    const [programs, setPrograms] = useState<ProgramListResponse[]>(dummyProgramData);
    const [selectedCategory, setSelectedCategory] = useState<string>("전체");

    const categories = ["전체", "건강", "문화", "치료"];

    const filteredProgram = selectedCategory === "전체" 
        ? programs 
        : programs.filter(program => program.category === selectedCategory);


    useEffect(() => {
        const fetchPrograms = async () => {
        try {
            const data = await getProgramList();
            if (data && data.length > 0) {
                setPrograms(data);
            }
        } catch (error) {
            console.error("프로그램 목록 불러오기 실패:", error);
            // API 실패 시 더미 데이터 유지
        }
        };

        fetchPrograms();
    }, []);

    return (
        <DefaultLayout header={<Header />} footer={<NavBar />}>
        <s.HomeWrapper>

        <s.SectionTitle>
            우리 동네 프로그램
        </s.SectionTitle>
        
        <s.CategoryButtons>
            {categories.map((category) => (
            <Button
                key={category}
                tone={selectedCategory === category ? "blue" : "gray"}
                variant={selectedCategory === category ? "subtle" : "subtle"}
                size="sm"
                radius="sm"
                typo={selectedCategory === category ? "label1" : "label2"}
                onClick={() => setSelectedCategory(category)}
                >
                        {category}
            </Button>
            ))}
        </s.CategoryButtons>

        <CardList
            items={filteredProgram}
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
                />
            )}
            direction="vertical"
        />


        </s.HomeWrapper>
        </DefaultLayout>
    );
};

export default ProgramHome;

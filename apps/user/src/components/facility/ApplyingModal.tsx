import styled from "styled-components";
import { Button } from "@core/ui/button";
import { useState, useEffect } from "react";
import * as s from "@components/common/datailPageLayout";

type ApplyingModalProps = {
    onClose: () => void;
};

export default function ApplyingModal({ onClose }: ApplyingModalProps) {
    // 🔧 테스트용: 이 값을 변경해서 각 케이스 UI 확인하기
    // null, "1등급", "2등급", "3등급", "4등급", "5등급", "인지지원등급"
    const TEST_CARE_GRADE = "인지지원등급"; // ← 여기를 수정하세요!
    //-----나중엔 삭제--------
    
    const [careGrade, setCareGrade] = useState<string | null>(null);

    useEffect(() => {
        // ----테스트 모드: TEST_CARE_GRADE 사용----
        if (TEST_CARE_GRADE !== null) {
            setCareGrade(TEST_CARE_GRADE);
            return;
        }
        ///// ---나중엔 삭제----
        
        // 실제 모드: 로컬스토리지에서 careGrade 가져오기
        const savedCareGrade = localStorage.getItem("careGrade");
        setCareGrade(savedCareGrade);
    }, []);

    // 등급 타입 분류 함수
    const getCareGradeType = (grade: string | null) => {
        if (!grade) return null;
        if (grade === '1등급' || grade === '2등급') return 'high';
        if (grade === '3등급' || grade === '4등급' || grade === '5등급') return 'middle';
        if (grade === '인지지원등급') return 'low';
        return null;
    };

    const gradeType = getCareGradeType(careGrade);

    // 핸들러 함수들
    const handleFacilityApply = () => {
        console.log("시설 상담 신청하기");
        // API 호출 등
    };

    const handleGeneralApply = () => {
        console.log("일반 상담 신청하기");
        // API 호출 등
    };

    const handleViewPrograms = () => {
        console.log("프로그램 보기");
        // 프로그램 페이지로 이동
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Overlay를 직접 클릭했을 때만 닫기 (자식 요소 클릭 시 제외)
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    
    return(
        <Overlay onClick={handleOverlayClick}>
            <ModalWrapper>
                <Header>
                    상담신청
                    <img src="/img/apply/close.png" onClick={onClose}/>
                </Header>
                <Container>
                    
                    {gradeType === 'high' || gradeType === 'middle' ? (
                        <>  
                            <img src="/img/apply/check.png" />
                            <Title>요양등급이 확인되었습니다</Title>
                            <Details>
                                요양시설 상담을 도와드릴게요. 
                                <br />시설 입소 및 급여 안내를 받으실 수 있습니다.
                            </Details>
                        </>
                    ) : null}

                    {gradeType === 'low' && (
                        <>
                            <img src="/img/apply/info.png" />
                            <Title>인지건강 프로그램 안내</Title>
                            <Details>
                                인지지원등급 어르신께 맞는 <br />
                                인지훈련 프로그램을 안내해드릴게요.
                            </Details>
                            <MyGrade className="service">
                                <s.DetailListTitle className="service">추천 서비스</s.DetailListTitle>
                                <s.DetailList>
                                    <s.DetailListItem>인지재활 프로그램</s.DetailListItem>
                                    <s.DetailListItem>두뇌활동 프로그램</s.DetailListItem>
                                    <s.DetailListItem>치매예방 교실</s.DetailListItem>
                                    <s.DetailListItem>기억력 향상 프로그램</s.DetailListItem>
                                </s.DetailList>
                            </MyGrade>
                        </>
                    )}

                    <MyGrade>
                        <p>현재 등록된 등급</p>
                        {careGrade || "미등록"}
                    </MyGrade>

                    {gradeType === 'high' && (
                        <Button variant="outline" typo="title2" tone="blue" radius="pill" size="md" 
                        fullWidth onClick={handleFacilityApply} style={{marginTop: "1rem"}}>
                            <img src="/img/apply/apply.png" style={{width:"20px", height:"20px"}}/>
                            시설 상담 신청하기
                        </Button>
                    )}

                    {gradeType === 'middle' && (
                        <Button variant="outline" typo="title2" tone="blue" radius="pill" size="md" 
                        fullWidth onClick={handleGeneralApply} style={{marginTop: "1rem"}}>
                            <img src="/img/apply/apply.png" style={{width:"20px", height:"20px"}}/>
                            일반 상담 신청하기
                        </Button>
                    )}

                    {gradeType === 'low' && (
                        <ButtonGroup>
                            <Button variant="solid" typo="title2" tone="blue" radius="pill" size="md" fullWidth onClick={handleViewPrograms}>
                                프로그램 보기
                            </Button>
                            <Button variant="outline" typo="title2" tone="blue" radius="pill" size="md" fullWidth onClick={handleGeneralApply}>
                                <img src="/img/apply/apply.png" style={{width:"20px", height:"20px"}}/>
                                일반 상담 신청하기
                            </Button>
                        </ButtonGroup>
                    )}
                </Container>
            </ModalWrapper>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalWrapper = styled.div`
    background-color: #fff;
    border-radius: 20px;
    width: 20rem;
    max-width: 400px;
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ theme }) => theme.fonts.heading3};
    color: ${({ theme }) => theme.colors.blue01};
    padding: 0.8rem 1.25rem;
    border-bottom: 0.68px solid #E0E0E0;
    img{
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`;

const Container = styled.div`
    background: ${({ theme }) => theme.colors.gray01};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1.8rem;
    gap: 1rem;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    img{
        width: 60px;
        height: 60px;
    }
`;

const Title = styled.div`
    ${({ theme }) => theme.fonts.title1};
`;

const Details = styled.div`
    text-align: center;
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray05};
`;

const MyGrade = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    border: 2px solid ${({ theme }) => theme.colors.blue02};
    background: ${({ theme }) => theme.colors.blue03};
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.blue01};
    p{
        color: ${({ theme }) => theme.colors.gray05};
        ${({ theme }) => theme.fonts.body4};
    }

    &.service{
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.2rem;
        padding: 0.7rem 1.2rem;
    }
`;


const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    margin-top: 1rem;
`;

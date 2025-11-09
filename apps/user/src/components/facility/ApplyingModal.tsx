import styled from "styled-components";
import { Button } from "@core/ui/button";
import { useState, useEffect } from "react";

export default function ApplyingModal() {
    const [careGrade, setCareGrade] = useState<string | null>(null);

    useEffect(() => {
        // 로컬스토리지에서 careGrade 가져오기
        const savedCareGrade = localStorage.getItem("careGrade");
        setCareGrade(savedCareGrade);
    }, []);

    const handleApply = () => {
        // 신청 로직 구현 (모달 닫기, API 호출 등)
        console.log("신청하기 클릭");
    };
    
    return(
        <Overlay>
            <ModalWrapper>
                <Header>
                    상담신청
                    <img src="/img/apply/close.png" />
                </Header>
                <Container>
                    <img src="/img/apply/check.png" />
                    <Title>요양등급이 확인되었습니다</Title>
                    <Details>
                        요양시설 상담을 도와드릴게요. 
                        <br />시설 입소 및 급여 안내를 받으실 수 있습니다.
                    </Details>
                    <MyGrade>
                        <p>현재 등록된 등급</p>
                        {careGrade || "미등록"}
                    </MyGrade>
                    <Button variant="outline" tone="blue" radius="pill" size="lg" fullWidth onClick={handleApply}>
                        신청하기
                    </Button>
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
`;

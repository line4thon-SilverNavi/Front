import DefaultLayout from "@layouts/DefaultLayout";
import CommonHeader from "@components/common/CommonHeader";
import styled from "styled-components";
import NavBar from "@components/common/NavBar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFacilityDetail } from "@apis/facility/facilityDetail";
import TextAreaContainer from "@core/components/TextAreaContainer";
import { Button } from "@core/ui/button";
import { postReview } from "@apis/facility/reviewposting";
import ReviewSuccessModal from "@components/facility/ReviewSuccessModal";

export default function PostReview(){
    const { facilityId } = useParams<{ facilityId: string }>();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [content, setContent] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const fetchFacilityInfo = async () => {
            if (!facilityId) return;
            
            try {
                const data = await getFacilityDetail(Number(facilityId));
                if (data) {
                    setName(data.name);
                }
            } catch (error) {
                console.error("시설 정보를 불러오는데 실패했습니다:", error);
            }
        };

        fetchFacilityInfo();
    }, [facilityId]);

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handleSubmit = async () => {
        if (!facilityId) return;
        if (rating === 0) {
            alert("별점을 선택해주세요.");
            return;
        }
        if (!content.trim()) {
            alert("후기 내용을 작성해주세요.");
            return;
        }

        try {
            await postReview(Number(facilityId), {
                rating,
                content: content.trim()
            });
            setShowSuccessModal(true);
        } catch (error) {
            console.error("리뷰 등록에 실패했습니다:", error);
            alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
        }
    };


    return(
        <>
            <ReviewSuccessModal 
                open={showSuccessModal} 
                onClose={() => setShowSuccessModal(false)} 
            />
            <DefaultLayout header={<CommonHeader title="이용 후기 작성"/>} footer={<NavBar />}>
                <Container>
                    <Facility>
                        <p>시설</p>
                        {name}
                    </Facility>
                <DoReview>
                    별점을 선택해주세요
                    <Stars>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <img
                                key={star}
                                src={star <= (hoverRating || rating) ? "/img/cards/rate.png" : "/img/detail-page/star-empty.png"}
                                alt={star <= (hoverRating || rating) ? "filled star" : "empty star"}
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            />
                        ))}
                    </Stars>
                    <RatingText>{rating}점</RatingText>
                </DoReview>
                <Divider />
                
                <ContentContainer>
                    <Title>후기를 작성해주세요</Title>
                    <TextAreaContainer
                        label=""
                        value={content}
                        onChange={setContent}
                        backgroundColor="transparent"
                        border="1px solid #e5e5e5"
                        placeholder="시설에 관한 후기를 자유롭게 작성해주세요"
                        helperText=" "
                    />
                </ContentContainer>
                
                <ButtonContainer>
                    <Button tone="blue" radius="pill" size="lg" fullWidth onClick={handleSubmit}>
                        등록하기
                    </Button>
                </ButtonContainer>
            </Container>
        </DefaultLayout>
        </>
    );
}

const Container = styled.div`
`;

const DoReview  = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.2rem 1rem 2rem 1rem;
    border-radius: 12px;
    gap: 1.2rem;
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.gray07};
`;

const Stars = styled.div`
    display: flex;
    gap: 0.75rem;
    
    img {
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: transform 0.2s ease;
        
        &:hover {
            transform: translateY(-4px);
        }
    }
`;

const RatingText = styled.p`
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.blue01};
    margin: 0;
`;

const Divider = styled.div`
    width: calc(100% + 2rem);
    height: 9px;
    background: ${({ theme }) => theme.colors.gray02};
    margin: 0 -1rem 1.5rem -1rem;
`;

const Facility = styled.div`
    p{
        ${({ theme }) => theme.fonts.title2};
        color: ${({ theme }) => theme.colors.blue01};
    }
    ${({ theme }) => theme.fonts.title3};
    color: ${({ theme }) => theme.colors.gray07};
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.blue03};
    border-radius: 10px;
    gap: 4px;
    margin-top: 0.5rem;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.gray07};
`;

const ButtonContainer = styled.div`
    margin-top: 5rem;
    padding-bottom: 1rem;
`;
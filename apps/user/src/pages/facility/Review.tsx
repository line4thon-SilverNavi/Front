import DefaultLayout from "@layouts/DefaultLayout";
import CommonHeader from "@components/common/CommonHeader";
import styled from "styled-components";
import NavBar from "@components/common/NavBar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFacilityDetail, type ReviewRes } from "@apis/facility/facilityDetail";
import ReviewCard from "@components/facility/ReviewCard";
import CardList from "@components/common/CardList";

export default function Review(){
    const { facilityId } = useParams<{ facilityId: string }>();
    const [reviews, setReviews] = useState<ReviewRes[]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            if (!facilityId) return;
            
            try {
                const data = await getFacilityDetail(Number(facilityId));
                if (data) {
                    setReviews(data.reviews);
                    setAverageRating(data.averageRating);
                }
            } catch (error) {
                console.error("리뷰 데이터를 불러오는데 실패했습니다:", error);
            }
        };

        fetchReviews();
    }, [facilityId]);

    const renderStars = () => {
        const stars = Array.from({ length: 5 }, (_, index) => index < Math.floor(averageRating));
        return stars.map((filled, index) => (
            <img
                key={index}
                src={filled ? "/img/cards/rate.png" : "/img/detail-page/star-empty.png"}
            />
        ));
    };

    return(
        <DefaultLayout header={<CommonHeader title="이용 후기"/>} footer={<NavBar />}>
            <Container>
                <DoReview>
                    방문 후기를 남겨주세요!
                    <Stars onClick={() => navigate("postreview")}>
                        <img src="/img/detail-page/star-empty.png"/>
                        <img src="/img/detail-page/star-empty.png"/>
                        <img src="/img/detail-page/star-empty.png"/>
                        <img src="/img/detail-page/star-empty.png"/>
                        <img src="/img/detail-page/star-empty.png"/>
                    </Stars>
                </DoReview>
                <Divider />
                
                {reviews.length === 0 ? (
                    <EmptyState>아직 작성된 리뷰가 없습니다.</EmptyState>
                ) : (
                    <>
                        <RatingSection>
                            <Left>
                                <AverageRating>{averageRating.toFixed(1)}</AverageRating>
                                <StarsContainer>
                                    {renderStars()}
                                </StarsContainer>
                            </Left>
                            <ReviewCount>후기 {reviews.length} <img src="/img/review/arrow.png"/></ReviewCount>
                        </RatingSection>
                        <CardList 
                            items={reviews}
                            renderCard={(review) => (
                                <ReviewCard key={review.id} review={review} backgroundColor="#eef8ff" />
                            )}
                            direction="vertical"
                        />
                    </>
                )}
            </Container>
        </DefaultLayout>
    );
}

const Container = styled.div`
`;

const RatingSection = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    background: ${({ theme }) => theme.colors.gray01};
    border-radius: 12px;
    margin-bottom: 1.5rem;
    justify-content: space-between;
`;

const AverageRating = styled.div`
    ${({ theme }) => theme.fonts.heading2};
    color: ${({ theme }) => theme.colors.gray07};
    margin-bottom: 0.2rem;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    gap:5px;
`;

const StarsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-bottom: 0.5rem;
    
    img {
        width: 20px;
        height: 20px;
    }
`;

const ReviewCount = styled.div`
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray05};
    align-items: center;
    display: flex;
    gap: 6px;
    img{
        width: 4px;
        height: 8px;
    }
`;

const EmptyState = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 1rem;
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.gray04};
`;

const DoReview  = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 1rem 2.5rem 1rem;
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
    }
`;

const Divider = styled.div`
    width: calc(100% + 2rem);
    height: 9px;
    background: ${({ theme }) => theme.colors.gray02};
    margin: 0 -1rem 1.5rem -1rem;
`;
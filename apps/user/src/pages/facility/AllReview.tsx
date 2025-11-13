import DefaultLayout from "@layouts/DefaultLayout";
import CommonHeader from "@components/common/CommonHeader";
import styled from "styled-components";
import NavBar from "@components/common/NavBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFacilityDetail, type ReviewRes } from "@apis/facility/facilityDetail";
import ReviewCard from "@components/facility/ReviewCard";
import CardList from "@components/common/CardList";

export default function AllReview(){
    const { facilityId } = useParams<{ facilityId: string }>();
    const [reviews, setReviews] = useState<ReviewRes[]>([]);
    const [averageRating, setAverageRating] = useState(0);

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
        return Array.from({ length: 5 }, (_, index) => {
            const fillPercentage = Math.min(Math.max(averageRating - index, 0), 1) * 100;
            
            return (
                <StarWrapper key={index}>
                    <img src="/img/detail-page/star-empty.png" alt="empty star" />
                    <FilledStar $fillPercentage={fillPercentage}>
                        <img src="/img/cards/rate.png" alt="filled star" />
                    </FilledStar>
                </StarWrapper>
            );
        });
    };

    return(
        <DefaultLayout header={<CommonHeader title="이용 후기"/>} footer={<NavBar />}>
            <Container>
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
                        </RatingSection>
                        <CardList 
                            items={reviews}
                            renderCard={(review) => (
                                <ReviewCard key={review.id} review={review} backgroundColor="#eef8ff" />
                            )}
                            direction="vertical"
                            gap="0.25rem"
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
    margin-top: 1rem;
    margin-bottom: 1rem;
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

const StarWrapper = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    
    img {
        width: 20px;
        height: 20px;
        display: block;
    }
`;

const FilledStar = styled.div<{ $fillPercentage: number }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    clip-path: inset(0 ${props => 100 - props.$fillPercentage}% 0 0);
    
    img {
        width: 20px;
        height: 20px;
        display: block;
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

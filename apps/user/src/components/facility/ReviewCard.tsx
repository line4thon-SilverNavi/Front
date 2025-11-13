import styled from "styled-components";
import { useFormatDateFull } from "@core/hooks/ProcessingTime";
import type { ReviewRes } from "@apis/facility/facilityDetail";

interface ReviewCardProps {
    review: ReviewRes;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const stars = Array.from({ length: 5 }, (_, index) => index < review.rating);
    
    return (
        <Card>
            <Header>
                <Name>
                    <Avatar>{review.authorName[0]}</Avatar>
                    {review.authorName[0]}**
                </Name>
                <Date>{useFormatDateFull(review.createdAt)}</Date>
            </Header>
            <RatingStarContainer>
                {stars.map((filled, index) => (
                    <img
                        key={index}
                        src={filled ? "/img/cards/rate.png" : "/img/detail-page/star-empty.png"}
                    />
                ))}
            </RatingStarContainer>
            <Content>{review.content}</Content>
        </Card>
    );
}

const Card = styled.div`
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray02};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.gray01};
    margin-bottom: 1rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const Name = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.gray07};
`;

const Avatar = styled.p`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.blue01};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }) => theme.fonts.title2};
    margin: 0;
`;

const Date = styled.div`
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray04};
`;

const RatingStarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2rem;
    margin-bottom: 0.5rem;
    
    img {
        width: 16px;
        height: 16px;
    }
`;

const Content = styled.div`
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.gray07};
    line-height: 1.5;
`;

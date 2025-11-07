import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "@components/common/BookmarkButton";

type FacilityCardProps = {
    facilityId: number;
    name: string | null;
    thumbnail: string;
    distanceKm: number;
    averageRating: number;
    reviewCount: number;
    operatingHours: string | null;
    phoneNumber: string | null;
    bookmarked: boolean;
};

export default function FacilityCard({
    facilityId,
    name,
    thumbnail,
    distanceKm,
    averageRating,
    reviewCount,
    operatingHours,
    phoneNumber,
    bookmarked
}: FacilityCardProps){
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/facility/${facilityId}`);
    };

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 카드 클릭 이벤트 방지
    };

    return(
        <CardWrapper onClick={handleCardClick}>
            <BookmarkButtonWrapper onClick={handleBookmarkClick}>
                <BookmarkButton 
                    initialBookmarked={bookmarked}
                    contentId={facilityId}
                    type="시설"
                />
            </BookmarkButtonWrapper>
            <Container>
                <Img style={{ backgroundImage: `url(${thumbnail})` }}></Img>
                <InfoContainer>
                    <Title>
                        <Name>{name}</Name>
                        <Distance><img src={"/img/cards/distance.png"}/> {distanceKm}km</Distance>
                    </Title>
                    <Details>
                        <Review>
                            <img src={"/img/cards/rate.png"}/> {averageRating} 
                            <p>({reviewCount})</p>
                        </Review>
                        <Time><img src={"/img/cards/time.png"}/> {operatingHours}</Time>
                        <Tel><img src={"/img/cards/tel.png"}/> {phoneNumber}</Tel>
                    </Details>
                </InfoContainer>
            </Container>
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
    width: 100%;
    border-radius: 20px;
    position: relative;
    cursor: pointer;
`;

const BookmarkButtonWrapper = styled.div`
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    z-index: 10;
`;

const Container = styled.div`
    display: grid;
    grid-template-rows: 12fr 13fr;
    border-radius: 12px;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.colors.gray03};
`;

const Img = styled.div`
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.8rem 1.1rem;
    gap: 0.5rem;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Name = styled.div`
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.gray07};
    margin: 0;
    margin-left: 0.15rem;
`;

const Distance = styled.span`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.blue01};
    display: flex;
    align-items: center;
    gap: 2px;
    img{
        width: 14.25px;
        height: 14.25px;
    }
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const Review = styled.div`
    display: flex;
    gap: 5px;
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray07};
    p{
        ${({ theme }) => theme.fonts.caption};
        color: ${({ theme }) => theme.colors.gray05};
    }
    img{
        width: 16px;
        height: 16px;
    }
`;

const Time = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray05};
    display: flex;
    align-items: center;
    gap: 8px;
    img{
        width: 12px;
        height: 12px;
    }
`;

const Tel = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray05};
    display: flex;
    align-items: center;
    gap: 8px;
    img{
        width: 12px;
        height: 12px;
    }
`;
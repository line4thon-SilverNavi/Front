import styled from "styled-components";
import BookmarkButton from "@components/common/BookmarkButton";
import { useFormatDate, useFormatTime } from "@hooks/program/ProcessingTime";
import { useNavigate } from "react-router-dom";

type ProgramCardProps = {
    programId: number;
    programName: string | null;
    category: string;
    date: string; 
    dayOfWeek: string;
    location: string;
    startTime: string;
    endTime: string;
    currentApplicants: number;
    capacity: number;
    fee: string; 
    thumbnail: string | null; 
    bookmarked: boolean;
};

export default function ProgramCard({
    programId,
    programName,
    category,
    date,
    dayOfWeek,
    thumbnail,
    location,
    startTime,
    endTime,
    currentApplicants,
    capacity,
    //fee,
    bookmarked
}: ProgramCardProps){
    const navigate = useNavigate();
    const formattedDate = useFormatDate(date);
    const formattedTime = useFormatTime(startTime, endTime);
    const applicationRate = (currentApplicants / capacity) * 100;
    
    // thumbnail이 null이면 더미 이미지 사용
    const displayThumbnail = thumbnail || "/img/dummy/program-default.png";

    const handleCardClick = () => {
        navigate(`/program/${programId}`, {
            state: {
                currentApplicants,
                capacity,
                dayOfWeek
            }
        });
    };

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 카드 클릭 이벤트 방지
    };

    return(
        <CardWrapper onClick={handleCardClick}>
            <BookmarkButtonWrapper onClick={handleBookmarkClick}>
                <BookmarkButton 
                    initialBookmarked={bookmarked}
                    contentId={programId}
                    type="프로그램"
                />
            </BookmarkButtonWrapper>
            <CategoryTag>
                {category}
            </CategoryTag>
            <Container>
                <Img style={{ backgroundImage: `url(${displayThumbnail})` }}></Img>
                <InfoContainer>
                    <Title>
                        <Name>{programName}</Name>
                    </Title>
                    <Details>
                        <Date>
                            <img src={"/img/navbar/calendar-gray.png"}/> {formattedDate} ({dayOfWeek})
                        </Date>
                        <Time><img src={"/img/cards/time.png"}/> {formattedTime}</Time>
                        <Location><img src={"/img/cards/location.png"}/> {location}</Location>
                    </Details>
                </InfoContainer>
                <Applicants>
                    <ApplicantText>신청 {currentApplicants}/{capacity}명</ApplicantText>
                    <ProgressBarContainer>
                        <ProgressBar $percentage={applicationRate} />
                    </ProgressBarContainer>
                </Applicants>
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

const CategoryTag = styled.div`
    position: absolute;
    top: 0.8rem;
    left: 0.8rem;
    z-index: 10;
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.blue01};
    background-color: ${({ theme }) => theme.colors.blue03};
    padding: 0.15rem 0.4rem;
    border-radius: 5px;
    width: 3rem;
    justify-content: center;
    display: flex;
    align-items: center;
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


const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const Date = styled.div`
    display: flex;
    gap: 5px;
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray05};
    align-items: center;
    p{
        ${({ theme }) => theme.fonts.caption};
        color: ${({ theme }) => theme.colors.gray05};
    }
    img{
        width: 13px;
        height: 12px;
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

const Location = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray05};
    display: flex;
    align-items: center;
    gap: 8px;
    img{
        width: 12px;
        height: 15px;
    }
`;

const Applicants = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1.1rem 0.8rem 1.1rem;
`;

const ApplicantText = styled.p`
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.blue01};
    margin: 0;
    white-space: nowrap;
`;

const ProgressBarContainer = styled.div`
    flex: 1;
    height: 5px;
    background-color: ${({ theme }) => theme.colors.gray03};
    border-radius: 4px;
    overflow: hidden;
`;

const ProgressBar = styled.div<{ $percentage: number }>`
    height: 100%;
    width: ${({ $percentage }) => Math.min($percentage, 100)}%;
    background-color: ${({ theme }) => theme.colors.blue01};
    border-radius: 4px;
    transition: width 0.3s ease;
`;
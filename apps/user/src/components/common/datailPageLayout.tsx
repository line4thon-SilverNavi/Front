

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { PropsWithChildren } from "react";
import BookmarkButton from "./BookmarkButton";

type DetailPageLayoutProps = {
  image: string;
  category: string; 
  onBack?: () => void;
  bookmarkProps?: {
    initialBookmarked: boolean;
    contentId: number;
    type: string;
  };
  footer?: React.ReactNode;
};

export function DetailPageLayout({
  image,
  category,
  onBack,
  bookmarkProps,
  footer,
  children,
}: PropsWithChildren<DetailPageLayoutProps>) {
  const navigate = useNavigate();
  const handleBack = () => (onBack ? onBack() : navigate(-1));

  return (
    <Wrap>
      <ImageContainer>
        <Image src={image} />
        <Header>
          <BackButton onClick={handleBack}>
            <img src="/img/auth/back.png" />
          </BackButton>
          {bookmarkProps && (
            <BookmarkButton
              initialBookmarked={bookmarkProps.initialBookmarked}
              contentId={bookmarkProps.contentId}
              type={bookmarkProps.type}
            />
          )}
        </Header>
        {category && (
          <CategoryTag>
            {category}
          </CategoryTag>
        )}
      </ImageContainer>

      <Content role="main">{children}</Content>

      {footer && <Footer>{footer}</Footer>}
    </Wrap>
  );
}

/* styled */
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.gray01};
  min-height: 100dvh;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 396 / 205;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray02};
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.36rem;
  z-index: 10;
`;

const BackButton = styled.button`
  background: ${({ theme }) => theme.colors.gray01};
  border: none;
  border-radius: 50%;
  padding: 7px 10px 3px 8px;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

const CategoryTag = styled.div`
    position: absolute;
    bottom: 1.2rem;
    left: 1.2rem;
    z-index: 10;
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.blue01};
    background-color: ${({ theme }) => theme.colors.blue03};
    padding: 0.3rem 0.8rem;
    border-radius: 5px;
    justify-content: center;
    display: flex;
    align-items: center;
`;

const Content = styled.div`
  flex: 1;
  padding: 1.36rem 1.36rem 0 1.36rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const Footer = styled.footer`
  padding: 1rem 1.36rem calc(1rem + env(safe-area-inset-bottom));
  background: ${({ theme }) => theme.colors.gray01};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;


// 시설 이름
export const DetailTitle = styled.h1`
  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.gray07};
  margin: 0;
`;

// 평점 섹션
type RatingProps = {
  rating: number;
  reviewCount: number;
};

export function DetailRating({ rating, reviewCount }: RatingProps) {
  return (
    <RatingContainer>
      <img src={"/img/cards/rate.png"}/> {rating}
      <p>({reviewCount})</p>
    </RatingContainer>
  );
}

const RatingContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray07};
  margin: 0.7rem 0;

  img{
    width: 16px;
    height: 16px;
  }

  p{
    color: ${({ theme }) => theme.colors.gray05};
  }
`;

// 참가자 섹션
export const Applicants = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
`;

export const ApplicantText = styled.p`
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.blue01};
    margin: 0;
    white-space: nowrap;
`;

//참가비 섹션
export const Fee = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 1.2rem;
    background-color: ${({ theme }) => theme.colors.blue02};
    border-radius: 10px;
    ${({ theme }) => theme.fonts.label1};
    color: ${({ theme }) => theme.colors.blue01};
    margin: 0 0 1.2rem 0;
    white-space: nowrap;
    p{
      color: ${({ theme }) => theme.colors.gray06};
      ${({ theme }) => theme.fonts.label2};
    }
`;

export const ProgressBarContainer = styled.div`
    flex: 1;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.gray03};
    border-radius: 12px;
    overflow: hidden;
    margin-left: 1rem;
`;

export const ProgressBar = styled.div<{ $percentage: number }>`
    height: 100%;
    width: ${({ $percentage }) => Math.min($percentage, 100)}%;
    background-color: ${({ theme }) => theme.colors.blue01};
    border-radius: 12px;
    transition: width 0.3s ease;
`;

// 설명 섹션
export const DetailDescription = styled.div`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray06};
  margin: 0;
  padding-bottom: 1.2rem;
  line-height: 1.5;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray03};
`;

// 정보 컨테이너
export const DetailInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin: 1rem 0;
  background: ${({ theme }) => theme.colors.gray01};
  border-radius: 8px;
`;

export const DetailInfoRow = styled.div`
  display: flex;
  gap: 0.7rem;
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray07};
  align-items: center;
`;

// 전체 너비 구분선 (패딩 무시)
export const FullWidthDivider = styled.div`
  width: calc(100% + 2.72rem);
  height: 9px;
  background: ${({ theme }) => theme.colors.gray02};
  margin-left: -1.36rem;
  margin-right: -1.36rem;
`;

// 리스트 섹션 (주요 서비스 등)
export const DetailListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0 0.25rem 0;
`;

// 소제목
export const DetailListTitle = styled.h2`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray07};
  margin: 0;

  &.moreinfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    p {
      margin: 0;
      ${({ theme }) => theme.fonts.caption};
      color: ${({ theme }) => theme.colors.gray04};
      cursor: pointer;
      text-decoration: underline;
      text-decoration-thickness: 10%;
    }
  }
`;

export const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

export const DetailListItem = styled.li`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray06};
  padding-left: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  
  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.blue01};
    ${({ theme }) => theme.fonts.heading2};
  }
`;

// 리뷰 컴포넌트
export const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray02};
  border-radius: 10px;
  padding: 1rem;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewName = styled.div`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray07};
  display: flex;
  align-items: center;
  p{
    margin: 0 0.5rem 0 0;
    background-color: ${({ theme }) => theme.colors.blue01};
    color: white;
    border-radius: 50%;
    padding: 5px 10px;
  }
`;

export const ReviewDate = styled.div`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray05};
`;

// 별점 표시 컴포넌트
type RatingStarProps = {
  rating: number;
};

export function RatingStar({ rating }: RatingStarProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);
  
  return (
    <RatingStarContainer>
      {stars.map((filled, index) => (
        <img
          key={index}
          src={filled ? "/img/cards/rate.png" : "/img/detail-page/star-empty.png"}
          alt={filled ? "filled star" : "empty star"}
        />
      ))}
    </RatingStarContainer>
  );
}

const RatingStarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  
  img {
    width: 16px;
    height: 16px;
  }
`;

export const ReviewText = styled.div`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray06};
  line-height: 1.5;
`;

// 첨부자료 & 문의전화 섹션
export const AttachmentBox = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.gray01};
  border: 1.5px solid ${({ theme }) => theme.colors.gray03};
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray02};
  }
`;

export const AttachmentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const AttachmentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AttachmentName = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray07};
`;

export const AttachmentSize = styled.div`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray05};
`;




import styled from "styled-components";
import type { ReviewItem } from "@apis/review/getReviews";
import { formatKDateTimeFull } from "@core/hooks/ProcessingTime";

type Props = {
  item: ReviewItem;
};

export default function ReviewItemCard({ item }: Props) {
  const { authorName, content, rating, createdDate } = item;

  const initial = authorName?.[0] ?? "?";

  const maskName = (name: string): string => {
    if (!name) return "";
    const first = name[0];
    return first + "**";
  };

  return (
    <Card>
      <HeaderRow>
        <Avatar>{initial}</Avatar>

        <HeaderText>
          <Name>{maskName(authorName)}</Name>
          <Meta>{formatKDateTimeFull(createdDate)}</Meta>
        </HeaderText>
      </HeaderRow>

      <StarsRow aria-label={`별점 ${rating}점`}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} $active={idx < rating}>
            <img src="/img/review/star.svg" />
          </Star>
        ))}
      </StarsRow>

      <Content>{content}</Content>
    </Card>
  );
}

const Card = styled.article`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.blue01};
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blue01};
  color: ${({ theme }) => theme.colors.gray01};
  ${({ theme }) => theme.fonts.label2};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Name = styled.span`
  color: ${({ theme }) => theme.colors.gray07};
  ${({ theme }) => theme.fonts.title2};
`;

const Meta = styled.span`
  color: ${({ theme }) => theme.colors.gray04};
  ${({ theme }) => theme.fonts.body4};
`;

const StarsRow = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.span<{ $active: boolean }>`
  img {
    width: 20px;
  }
`;

const Content = styled.p`
  white-space: pre-wrap;
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray07};
`;

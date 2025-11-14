import styled from "styled-components";
import type { ReviewItem } from "@apis/review/getReviews";
import ReviewItemCard from "./ReviewItemCard";

type Props = {
  items: ReviewItem[];
};

export default function ReviewList({ items }: Props) {
  if (!items.length) {
    return <Empty>아직 등록된 후기가 없습니다.</Empty>;
  }

  return (
    <List>
      {items.map((item) => (
        <ReviewItemCard key={item.reviewId} item={item} />
      ))}
    </List>
  );
}

const List = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Empty = styled.p`
  margin-top: 24px;
  text-align: center;
  ${({ theme }) => theme.fonts?.body2};
  color: ${({ theme }) => theme.colors.gray01 || "#999"};
`;

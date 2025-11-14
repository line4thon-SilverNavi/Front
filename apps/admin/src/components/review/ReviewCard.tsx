import { CounselStatusItem } from "@components/counsel/StatusItem";
import styled, { useTheme } from "styled-components";

export type ReviewSummary = {
  totalReviews: number;
  averageRating: number;
  fiveStarCount: number;
  lowStarCount: number;
};

type Props = {
  summary: ReviewSummary;
};

export default function ReviewStatusCard({ summary }: Props) {
  const theme = useTheme();

  const { totalReviews, averageRating, fiveStarCount, lowStarCount } = summary;

  const stats = [
    {
      label: "전체 리뷰",
      value: totalReviews,
      color: theme.colors.gray07,
      showReview: true,
    },
    {
      label: "평균 별점",
      value: averageRating,
      color: "#FFD700",
      showStar: true,
    },
    {
      label: "5점 리뷰",
      value: fiveStarCount,
      color: theme.colors.gray07,
      showReview: true,
    },
    {
      label: "1~2점 리뷰",
      value: lowStarCount,
      color: theme.colors.alert,
      showReview: true,
    },
  ];

  return (
    <CardWrapper>
      {stats.map((s) => (
        <CounselStatusItem
          key={s.label}
          label={s.label}
          value={s.value}
          color={s.color}
          showStar={s.showStar}
          showReview={s.showReview}
        />
      ))}
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

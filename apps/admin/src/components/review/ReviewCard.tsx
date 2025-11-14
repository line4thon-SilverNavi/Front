import type { ReviewStatus } from "@apis/review/getReviews";
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
  selectedStatus?: ReviewStatus;
  onStatusChange?: (status?: ReviewStatus) => void;
};

const TABS: { key: "all" | ReviewStatus; label: string }[] = [
  { key: "all", label: "전체" },
  { key: 5, label: "5" },
  { key: 4, label: "4" },
  { key: 3, label: "3" },
  { key: 2, label: "2" },
  { key: 1, label: "1" },
];

export default function ReviewStatusCard({
  summary,
  selectedStatus,
  onStatusChange,
}: Props) {
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
    <Wrapper>
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
      <TabBar>
        {TABS.map((tab) => {
          const isAll = tab.key === "all";
          const active = isAll
            ? selectedStatus === undefined
            : selectedStatus === tab.key;

          return (
            <TabButton
              key={tab.key}
              type="button"
              $active={active}
              onClick={() =>
                onStatusChange?.(isAll ? undefined : (tab.key as ReviewStatus))
              }
            >
              {!isAll && (
                <StarIcon src="/img/review/star.svg" alt="" aria-hidden />
              )}
              {tab.label}
            </TabButton>
          );
        })}
      </TabBar>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TabBar = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 8px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray01};
  border: 0.636px solid ${({ theme }) => theme.colors.gray03};
`;

const TabButton = styled.button<{ $active: boolean }>`
  min-width: 60px;
  padding: 13px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: #f5f5f5;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  ${({ theme }) => theme.fonts.body3};

  ${({ $active, theme }) =>
    $active
      ? `
    background: ${theme.colors.blue01};
    color: #fff;
  `
      : `
    color: ${theme.colors.gray06};
  `};
`;

const StarIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

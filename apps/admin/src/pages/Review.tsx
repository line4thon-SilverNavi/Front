import { useEffect, useState } from "react";
import ReviewStatusCard from "@components/review/ReviewCard";
import ReviewList from "@components/review/ReviewList";
import {
  getReviews,
  type ReviewSummary,
  type ReviewItem,
  type PageInfo,
  type ReviewStatus,
} from "@apis/review/getReviews";
import toast from "react-hot-toast";
import Pagination from "@components/common/Pagination";

const Review = () => {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [page, setPage] = useState(1);
  const [_, setLoading] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<ReviewStatus | undefined>();

  useEffect(() => {
    async function fetchInitial() {
      try {
        setLoading(true);
        const res = await getReviews({
          page,
          rating: ratingFilter,
        });
        setSummary(res.summary);
        setReviews(res.reviews);
        setPageInfo(res.pageInfo);
      } catch (err) {
        console.error(err);
        toast.error("리뷰 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchInitial();
  }, [page, ratingFilter]);

  if (!summary) return <div>불러오는 중</div>;

  return (
    <>
      <ReviewStatusCard
        summary={summary}
        selectedStatus={ratingFilter}
        onStatusChange={(rating) => {
          setRatingFilter(rating);
          setPage(1);
        }}
      />
      <ReviewList items={reviews} />
      {pageInfo && (
        <Pagination
          totalPages={pageInfo.totalPages}
          currentPage={page}
          onChange={setPage}
        />
      )}
    </>
  );
};

export default Review;

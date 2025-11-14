// src/pages/review/Review.tsx
import { useEffect, useState } from "react";
import ReviewStatusCard from "@components/review/ReviewCard";
import ReviewList from "@components/review/ReviewList";
import {
  getReviews,
  type ReviewSummary,
  type ReviewItem,
} from "@apis/review/getReviews";
import toast from "react-hot-toast";

const Review = () => {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    async function fetchInitial() {
      try {
        const res = await getReviews(); // 첫 페이지, 전체
        setSummary(res.summary);
        setReviews(res.reviews);
      } catch (err) {
        console.error(err);
        toast.error("리뷰 정보를 불러오지 못했습니다.");
      }
    }

    fetchInitial();
  }, []);

  if (!summary) return <div>불러오는 중</div>;

  return (
    <>
      <ReviewStatusCard summary={summary} />
      <ReviewList items={reviews} />
    </>
  );
};

export default Review;

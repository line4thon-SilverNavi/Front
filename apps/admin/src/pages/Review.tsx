import { useEffect, useState } from "react";
import ReviewStatusCard from "@components/review/ReviewCard";
import { getReviews, type ReviewSummary } from "@apis/review/getReviews";
import toast from "react-hot-toast";

const Review = () => {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await getReviews();
        setSummary(res.summary);
      } catch (err) {
        console.error(err);
        toast.error("리뷰 정보를 불러오지 못했습니다.");
      }
    }

    fetchSummary();
  }, []);

  if (!summary) return <div>불러오는 중...</div>;

  return <ReviewStatusCard summary={summary} />;
};

export default Review;

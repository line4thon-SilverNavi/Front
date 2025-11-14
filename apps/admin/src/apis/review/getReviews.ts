import { getResponse } from "@core/api/instance";

export type ReviewStatus = 1 | 2 | 3 | 4 | 5;

export type ReviewSummary = {
  totalReviews: number;
  averageRating: number;
  fiveStarCount: number;
  lowStarCount: number;
};

export type ReviewItem = {
  reviewId: number;
  authorName: string;
  content: string;
  rating: number;
  createdDate: string;
};

export type PageInfo = {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
};

export type ReviewsRes = {
  summary: ReviewSummary;
  reviews: ReviewItem[];
  pageInfo: PageInfo;
};

export async function getReviews(params?: {
  page?: number;
  rating?: ReviewStatus;
}): Promise<ReviewsRes> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.rating) search.set("rating", String(params.rating));

  const url =
    "/api/reviews" + (search.toString() ? `?${search.toString()}` : "");

  const res = await getResponse<{
    isSuccess: boolean;
    message?: string;
    data: ReviewsRes;
  }>(url);

  if (!res?.isSuccess) {
    throw new Error(res?.message || "리뷰를 불러오지 못했습니다.");
  }
  return res.data;
}

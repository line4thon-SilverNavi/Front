import { postNoResponse } from "@core/api/instance";

export type ReviewPostRequest = {
    rating: number;
    content: string;
};

export async function postReview(facilityId: number, request: ReviewPostRequest) {
    return await postNoResponse<ReviewPostRequest>(
        `/api/reviews/${facilityId}`,
        request
    );
}

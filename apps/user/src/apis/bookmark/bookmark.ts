import { postResponse } from "@core/api/instance";

export type BookmarkRequest = {
    type: string | null;
    contentId: number;
};

export type BookmarkData = {
    status: string;
};

export type BookmarkResponse = {
    isSuccess: boolean;
    timestamp: string;
    code: string;
    httpStatus: number;
    message: string;
    data: BookmarkData;
};

export async function bookmarking(body: BookmarkRequest) {
    return await postResponse<BookmarkRequest, BookmarkResponse>(
        "/api/bookmarks",
        body
    );
}

import { getResponse } from "@core/api/instance";

export type UserDetailResponse = {
    guardianName: string;
    relation: string;
    guardianPhone: string;
    careTargetName: string;
    careTargetBirth: string;
    careTargetGender: string;
    bookmarkCount: number;
    consultCount: number;
    reviewCount: number;
    hasCareTarget: boolean;
};

export async function getUserDetail() {
    const response = await getResponse<{ data: UserDetailResponse }>(
        "/api/users/details"
    );
    return response?.data;
}

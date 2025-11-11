import { getResponse } from "@core/api/instance";

export type MypageResponse = {
    guardianName: string;
    guardianPhone: string;
    careTargetName: string | null;
    careTargetBirth: string | null;
    careTargetGender: string | null;
    relationRole: string | null;
    careTargetPhone: string | null;
    careGrade: string | null;
    bookmarkCount: number;
    consultCount: number;
    reviewCount: number;
    hasCareTarget: boolean;
};

export async function getMypage() {
    const response = await getResponse<{ data: MypageResponse }>(
        "/api/users/mypage"
    );
    return response?.data;
}

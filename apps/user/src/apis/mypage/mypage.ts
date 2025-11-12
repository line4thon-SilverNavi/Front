import { getResponse } from "@core/api/instance";

export type MypageResponse = {
    guardianName: string;
    relation: string | null;
    guardianPhone: string;
    careTargetName: string | null;
    careTargetBirth: string | null;
    careTargetGender: string | null;    
    bookmarkCount: number;
    consultCount: number;
    reviewCount: number;
    hasCareTarget: boolean;

    careTargetPhone: string | null;
    careGrade: string | null;

};

export async function getMypage() {
    const response = await getResponse<{ data: MypageResponse }>(
        "/api/users/mypage"
    );
    return response?.data;
}

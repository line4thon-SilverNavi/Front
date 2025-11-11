import { getResponse } from "@core/api/instance";

export type UserDetailResponse = {
    guardianName: string;
    guardianPhone: string;
    careTargetName: string | null;
    careTargetBirth: string | null;
    careTargetGender: string | null;
    relationRole: string | null;
    careTargetPhone: string | null;
    careGrade: string | null;
};

export async function getUserDetail() {
    const response = await getResponse<{ data: UserDetailResponse }>(
        "/api/users/details"
    );
    return response?.data;
}

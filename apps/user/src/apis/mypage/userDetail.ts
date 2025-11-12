import { getResponse } from "@core/api/instance";

export type UserDetailResponse = {
    guardianName: string;
    guardianPhone: string;
    careTargetName: string;
    careTargetPhone: string;
    careTargetBirth: string;
    careTargetGender: string;
    relationRole: string;
    careGrade: string;
};

export async function getUserDetail() {
    const response = await getResponse<{ data: UserDetailResponse }>(
        "/api/users/details"
    );
    return response?.data;
}

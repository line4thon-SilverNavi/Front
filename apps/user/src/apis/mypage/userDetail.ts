import { getResponse } from "@core/api/instance";

export type UserDetailResponse = {
    userName: string;
    userPhone: string;
    careTargetName: string | null;
    careTargetBirth: string | null;
    careTargetGender: string | null;
    relationRole: string | null;
    address: string | null;
    careNumber: string | null;
    careGrade: string | null;
};

export async function getUserDetail() {
    const response = await getResponse<{ data: UserDetailResponse }>(
        "/api/users/detail"
    );
    return response?.data;
}

import { patchResponse } from "@core/api/instance";

export type UpdateUserInfoRequest = {
    careTargetName?: string;
    relationRole?: "본인" | "배우자" | "자녀" | "형제/자매";
    careTargetPhone?: string;
    careTargetBirth?: string;
    careGrade?: "1등급" | "2등급" | "3등급" | "4등급" | "5등급" | "등급외";
    careTargetGender?: "남성" | "여성";
};

export type UpdateUserInfoResponse = {
    isSuccess: boolean;
    message: string;
};

export async function updateUserInfo(body: UpdateUserInfoRequest) {
    const response = await patchResponse<UpdateUserInfoRequest, UpdateUserInfoResponse>(
        "/api/users",
        body
    );
    return response;
}

import { getResponse } from "@core/api/instance";

export type ConsultItem = {
    id: number;
    facilityName: string;
    consultCategory: "일반상담" | "시설상담";
    consultType: "대면" | "비대면" | null;
    consultStatus: "대기중" | "확정" | "완료";
    content: string;
    createdAt: string;
};

export type UserConsultsResponse = {
    totalCount: number;
    waitingCount: number;
    confirmedCount: number;
    completedCount: number;
    consults: ConsultItem[];
};

export async function getUserConsults() {
    const response = await getResponse<{ data: UserConsultsResponse }>(
        "/api/consults"
    );
    return response?.data;
}

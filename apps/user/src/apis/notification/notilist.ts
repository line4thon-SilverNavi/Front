import { getResponse } from "@core/api/instance";

export type NotificationResponse = {
    notificationId: number;
    type: "프로그램 신청" | "상담" | "프로그램 일정"| "리뷰 답변";
    status: "승인" | "거부" | null;
    targetName: string;
    rejectReason: string | null;
    programDate: string | null;
    programStartTime: string | null;
    isRead: boolean;
    createdAt: string; // 알림 생성 시간
};

export async function getNotificationList() { 
    const response = await getResponse<{ data: NotificationResponse[] }>(
        "/api/notifications/list"
    );
    return response?.data || [];
}

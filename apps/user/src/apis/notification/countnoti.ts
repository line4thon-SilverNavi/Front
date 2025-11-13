import { getResponse } from "@core/api/instance";

export type NotificationCountData = {
    count: number;
};

export type NotificationCountResponse = {
    isSuccess: boolean;
    timestamp: string;
    code: string;
    httpStatus: number;
    message: string;
    data: NotificationCountData;
};

export async function getNotificationCount() { 
    const response = await getResponse<NotificationCountResponse>(
        "/api/notifications"
    );
    return response?.data?.count;
}

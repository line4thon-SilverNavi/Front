import { postResponse } from "@core/api/instance";

export type ReadNotificationResponse = {
    isSuccess: boolean;
    message: string;
};

export async function postReadNotification(notificationId: number) {
    return await postResponse<null, ReadNotificationResponse>(
        `/api/notifications/${notificationId}`,
        null
    );
}

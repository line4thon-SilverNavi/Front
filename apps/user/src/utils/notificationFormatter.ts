import type { NotificationResponse } from "@apis/notification/notilist";
import { NOTIFICATION_ICON_PATHS, NOTIFICATION_TITLES, STATUS_MESSAGES } from "@constants/notification";
import { checkTodayOrTomorrow, useFormatDate, useFormatSingleTime } from "@core/hooks/ProcessingTime";

export interface FormattedNotification {
    icon: string;
    title: string;
    details: string;
    color?: string;
}

/**
 * 알림 타입, 상태, 읽음 여부에 따른 아이콘 경로 반환
 */
export function getNotificationIcon(notification: NotificationResponse): string {
    const { type, status, isRead } = notification;
    
    switch (type) {
        case "프로그램 신청":
            if (status === "승인") {
                return isRead 
                    ? NOTIFICATION_ICON_PATHS.programApply.approvedRead 
                    : NOTIFICATION_ICON_PATHS.programApply.approvedUnread;
            }
            // status === "거부"
            return isRead 
                ? NOTIFICATION_ICON_PATHS.programApply.rejectedRead 
                : NOTIFICATION_ICON_PATHS.programApply.rejectedUnread;
            
        case "상담":
            if (status === "승인") {
                return isRead 
                    ? NOTIFICATION_ICON_PATHS.consult.approvedRead 
                    : NOTIFICATION_ICON_PATHS.consult.approvedUnread;
            }
            // status === "거부"
            return isRead 
                ? NOTIFICATION_ICON_PATHS.consult.rejectedRead 
                : NOTIFICATION_ICON_PATHS.consult.rejectedUnread;
            
        case "프로그램 일정":
            return isRead 
                ? NOTIFICATION_ICON_PATHS.programSchedule.read 
                : NOTIFICATION_ICON_PATHS.programSchedule.unread;
            
        case "리뷰 답변":
            return isRead 
                ? NOTIFICATION_ICON_PATHS.review.read 
                : NOTIFICATION_ICON_PATHS.review.unread;
            
        default:
            return NOTIFICATION_ICON_PATHS.programSchedule.read;
    }
}

/**
 * 알림 타입과 상태에 따른 제목 생성
 */
export function formatNotificationTitle(notification: NotificationResponse): string {
    const { type, status, programDate } = notification;
    
    switch (type) {
        case "프로그램 신청":
            return status === "승인" 
                ? NOTIFICATION_TITLES.programApply.approved 
                : NOTIFICATION_TITLES.programApply.rejected;
            
        case "상담":
            return status === "승인" 
                ? NOTIFICATION_TITLES.consult.approved 
                : NOTIFICATION_TITLES.consult.rejected;
            
        case "프로그램 일정":
            return NOTIFICATION_TITLES.programSchedule(programDate || "");
            
        case "리뷰 답변":
            return NOTIFICATION_TITLES.review;
            
        default:
            return "";
    }
}

/**
 * 알림 타입과 상태에 따른 상세 내용 생성
 */
export function formatNotificationDetails(notification: NotificationResponse): string {
    const { type, status, programDate, programStartTime, targetName } = notification;
    
    // 프로그램 신청
    if (type === "프로그램 신청") {
        if (status === "승인" && programDate && programStartTime) {
            const dateLabel = checkTodayOrTomorrow(programDate) || useFormatDate(programDate);
            const timeLabel = useFormatSingleTime(programStartTime);
            return `"${targetName}" 프로그램 신청이 승인되었습니다. ${dateLabel} ${timeLabel}에 참여해주세요.`;
        }
        if (status === "거부") {
            return `${targetName} 신청이 거부되었습니다.`;
        }
    }
    
    // 상담
    if (type === "상담") {
        if (status === "거부") {
            return `'${targetName}'에서 상담 신청을 거부하였습니다.`;
        }
        if (status === "승인") {
            return STATUS_MESSAGES.approved;
        }
    }
    
    // 프로그램 일정
    if (type === "프로그램 일정" && programDate && programStartTime) {
        const dateLabel = checkTodayOrTomorrow(programDate) || useFormatDate(programDate);
        const timeLabel = useFormatSingleTime(programStartTime);
        return `${dateLabel} ${timeLabel}에 ${targetName} 프로그램이 예정 되어 있습니다.
        늦지 않게 참석해주세요!`;
    }
    
    // 리뷰 답변
    if (type === "리뷰 답변") {
        return `${targetName}에서 이용후기에 답변을 남겼습니다.`;
    }
    
    return "";
}

/**
 * 알림 데이터를 표시용 포맷으로 변환
 */
export function formatNotification(notification: NotificationResponse): FormattedNotification {
    return {
        icon: getNotificationIcon(notification),
        title: formatNotificationTitle(notification),
        details: formatNotificationDetails(notification)
    };
}

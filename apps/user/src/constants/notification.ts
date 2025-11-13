import { checkTodayOrTomorrow } from "@core/hooks/ProcessingTime";

// 알림 아이콘 이미지 경로
export const NOTIFICATION_ICON_PATHS = {
    programApply: {
        approvedUnread: "/img/apply/check.png",
        approvedRead: "/img/notification/check-gray.png",
        rejectedUnread: "/img/notification/reject-red.png",
        rejectedRead: "/img/notification/reject-gray.png"
    },
    consult: {
        approvedUnread: "/img/apply/check.png",
        approvedRead: "/img/notification/check-gray.png",
        rejectedUnread: "/img/notification/reject-red.png",
        rejectedRead: "/img/notification/reject-gray.png"
    },
    programSchedule: {
        unread: "/img/notification/time-blue.png",
        read: "/img/notification/time-gray.png"
    },
    review: {
        unread: "/img/notification/answer-blue.png",
        read: "/img/notification/answer-gray.png"
    }
} as const;

// 알림 타입별 타이틀 메시지
export const NOTIFICATION_TITLES = {
    programApply: {
        approved: "프로그램 신청이 승인되었습니다 ✅",
        rejected: "프로그램 신청이 거부되었습니다."
    },
    consult: {
        approved: "상담신청이 승인되었습니다 ✅",
        rejected: "상담신청이 거부되었습니다."
    },
    review: "작성하신 리뷰에 답변이 달렸어요 💬",
    programSchedule: (date: string) => {
        // 실제로는 오늘/내일 일정만 알림으로 옴
        const dateLabel = checkTodayOrTomorrow(date);
        // 기본적으론 오늘 일정 알림이라고 표시... 사실 백에서 오늘/내일 알림이 아닌거 보낼 이유가 X
        return `${dateLabel || "오늘"} 프로그램 일정이 있어요 🎵`;
    }
} as const;

// 상태별 메시지 템플릿
export const STATUS_MESSAGES = {
    approved: "승인되었습니다. 자세한 내용을 확인해주세요.",
    rejected: (reason: string) => `거부 사유: ${reason}`,
    pending: "검토 중입니다."
} as const;


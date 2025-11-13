import type { NotificationResponse } from "@apis/notification/notilist";

export const notificationDummyData: NotificationResponse[] = [
    // 프로그램 신청 - 승인 (미확인)
    {
        notificationId: 1,
        type: "프로그램 신청",
        status: "승인",
        targetName: "건강체조",
        rejectReason: null,
        programDate: (() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
        })(),
        programStartTime: "10:00:00",
        isRead: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30분 전
    },
    // 프로그램 신청 - 승인 (확인함)
    {
        notificationId: 2,
        type: "프로그램 신청",
        status: "승인",
        targetName: "음악치료",
        rejectReason: null,
        programDate: (() => {
            const today = new Date();
            return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        })(),
        programStartTime: "14:30:00",
        isRead: true,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2시간 전
    },
    // 프로그램 신청 - 거부 (미확인)
    {
        notificationId: 3,
        type: "프로그램 신청",
        status: "거부",
        targetName: "미술치료",
        rejectReason: "정원이 초과되었습니다.",
        programDate: null,
        programStartTime: null,
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5시간 전
    },
    // 프로그램 신청 - 거부 (확인함)
    {
        notificationId: 4,
        type: "프로그램 신청",
        status: "거부",
        targetName: "원예치료",
        rejectReason: "신청 기간이 마감되었습니다.",
        programDate: null,
        programStartTime: null,
        isRead: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1일 전
    },
    // 상담 신청 - 승인 (미확인)
    {
        notificationId: 5,
        type: "상담",
        status: "승인",
        targetName: "성북구요양병원",
        rejectReason: null,
        programDate: null,
        programStartTime: null,
        isRead: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3일 전
    },
    // 상담 신청 - 승인 (확인함)
    {
        notificationId: 6,
        type: "상담",
        status: "승인",
        targetName: "성북구요양병원",
        rejectReason: null,
        programDate: null,
        programStartTime: null,
        isRead: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5일 전
    },
    // 상담 신청 - 거부 (미확인)
    {
        notificationId: 7,
        type: "상담",
        status: "거부",
        targetName: "노원구요양원",
        rejectReason: "상담사가 부재중입니다.",
        programDate: null,
        programStartTime: null,
        isRead: false,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6일 전
    },
    // 상담 신청 - 거부 (확인함)
    {
        notificationId: 8,
        type: "상담",
        status: "거부",
        targetName: "노원구요양원",
        rejectReason: "예약이 불가능한 시간입니다.",
        programDate: null,
        programStartTime: null,
        isRead: true,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // 8일 전
    },
    // 프로그램 일정 - 오늘 (미확인)
    {
        notificationId: 9,
        type: "프로그램 일정",
        status: null,
        targetName: "건강체조",
        rejectReason: null,
        programDate: (() => {
            const today = new Date();
            return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        })(),
        programStartTime: "10:00:00",
        isRead: false,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() // 1시간 전
    },
    // 프로그램 일정 - 오늘 (확인함)
    {
        notificationId: 10,
        type: "프로그램 일정",
        status: null,
        targetName: "음악치료",
        rejectReason: null,
        programDate: (() => {
            const today = new Date();
            return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        })(),
        programStartTime: "14:30:00",
        isRead: true,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() // 3시간 전
    },
    // 프로그램 일정 - 내일 (미확인)
    {
        notificationId: 11,
        type: "프로그램 일정",
        status: null,
        targetName: "미술치료",
        rejectReason: null,
        programDate: (() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
        })(),
        programStartTime: "09:00:00",
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2시간 전
    },
    // 프로그램 일정 - 내일 (확인함)
    {
        notificationId: 12,
        type: "프로그램 일정",
        status: null,
        targetName: "원예치료",
        rejectReason: null,
        programDate: (() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
        })(),
        programStartTime: "15:45:00",
        isRead: true,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4시간 전
    },
    // 리뷰 답변 (미확인)
    {
        notificationId: 13,
        type: "리뷰 답변",
        status: null,
        targetName: "서울시니어복지관",
        rejectReason: null,
        programDate: null,
        programStartTime: null,
        isRead: false,
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString() // 45분 전
    },
    // 리뷰 답변 (확인함)
    {
        notificationId: 14,
        type: "리뷰 답변",
        status: null,
        targetName: "강남복지센터",
        rejectReason: null,
        programDate: null,
        programStartTime: null,
        isRead: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2일 전
    }
];

import type { ProgramHistoryData, ConsultHistoryData } from "@apis/history/history";

// 프로그램 신청 내역 더미 데이터
export const dummyProgramHistory: ProgramHistoryData = {
    scheduledCount: 2,
    completedCount: 0,
    programs: [
        {
            programId: 1,
            programName: "치매 예방 인지 교실",
            location: "서울시 강남구",
            category: "건강",
            date: "2025-01-15",
            dayOfWeek: "수요일",
            startTime: "14:00",
            endTime: "16:00",
            currentApplicants: 12,
            capacity: 20,
            fee: "무료",
            thumbnail: "/img/dummy/program-default.png",
            bookmarked: true,
            status: "예정"
        },
        {
            programId: 2,
            programName: "실버 요가 클래스",
            location: "서울시 송파구",
            category: "운동",
            date: "2025-01-20",
            dayOfWeek: "토요일",
            startTime: "10:00",
            endTime: "11:30",
            currentApplicants: 8,
            capacity: 15,
            fee: "10,000원",
            thumbnail: "/img/dummy/program-default.png",
            bookmarked: false,
            status: "예정"
        }
    ]
};

// 상담 내역 더미 데이터
export const dummyConsultHistory: ConsultHistoryData = {
    totalCount: 2,
    waitingCount: 1,
    confirmedCount: 1,
    completedCount: 0,
    consults: [
        {
            id: 1,
            facilityName: "행복노인복지센터",
            consultCategory: "시설상담",
            consultType: "대면",
            consultStatus: "대기중",
            content: "주간보호서비스 이용 문의드립니다.",
            createdAt: "2025-01-10"
        },
        {
            id: 2,
            facilityName: "온정주간보호센터",
            consultCategory: "일반상담",
            consultType: "비대면",
            consultStatus: "확인됨",
            content: "방문요양 서비스 비용 문의",
            createdAt: "2025-01-08"
        }
    ]
};

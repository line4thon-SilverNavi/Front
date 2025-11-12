import type { ProgramDetailData } from "@apis/program/programDetail";

// 더미 데이터
export const programDetailDummy: ProgramDetailData = {
    programId: 1,
    name: "시니어 디지털 사진 교실",
    category: "문화",
    instructorName: "김민지",
    date: "2025-11-10",
    startTime: "14:00",
    endTime: "15:30",
    location: "프로그램실 A",
    capacity: 15,
    fee: "무료",
    number: "02-1111-2222",
    description: "스마트폰으로 사진 잘 찍는 방법을 배워봅니다. 기초부터 차근차근 알려드립니다.",
    supplies: ["스마트폰", "필기도구"],
    proposal: "편안한 복장으로 참여해주세요",
    images: [
        "/img/dummy/program-default.png",
        "/img/dummy/program-default.png"
    ],
    bookmarked: true
};

// 더미 API 함수
export async function getProgramDetailDummy(programId: number): Promise<ProgramDetailData> {
    // programId에 맞춰 데이터 반환
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ...programDetailDummy,
                programId: programId // 요청한 ID로 변경
            });
        });
    });
}

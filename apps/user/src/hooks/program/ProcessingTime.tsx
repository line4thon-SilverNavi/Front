// "2025-11-10" -> "11월 10일"로 변환
export function useFormatDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        return `${month}월 ${day}일`;
    } catch (error) {
        console.error("날짜 변환 실패:", error);
        return dateString;
    }
}

// "14:00", "15:30" -> "오후 14:00 - 15:30"로 변환
export function useFormatTime(startTime: string, endTime: string): string {
    try {
        const startHour = parseInt(startTime.split(':')[0]);
        const period = startHour < 12 ? '오전' : '오후';
        
        return `${period} ${startTime} - ${endTime}`;
    } catch (error) {
        console.error("시간 변환 실패:", error);
        return `${startTime} - ${endTime}`;
    }
}

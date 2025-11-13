// 내부 헬퍼: 24h → 12h + 오전/오후
function toK12(hhmm: string) {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm);
  if (!m) return null;
  const hh = parseInt(m[1], 10);
  const mm = m[2];
  const isAM = hh < 12;
  // 0,12 → 12, 13→1 …
  const h12 = ((hh + 11) % 12) + 1;
  return { meridiem: isAM ? "오전" : "오후", h12: String(h12), mm };
}

const DOW = ["일", "월", "화", "수", "목", "금", "토"];
export function formatKDate(dateString: string, withDow = true): string {
  try {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;

    const month = d.getMonth() + 1;
    const day = d.getDate();
    const dow = DOW[d.getDay()];

    return withDow ? `${month}월 ${day}일(${dow})` : `${month}월 ${day}일`;
  } catch (err) {
    console.error("날짜 변환 실패:", err);
    return dateString;
  }
}

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

// "2025-10-25T14:30:00" -> "2025-10-25"로 변환
export function useFormatDateFull(dateString: string): string {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("날짜 변환 실패:", error);
    return dateString;
  }
}

// "14:00","15:30" -> "오후 2:00 - 3:30"
// "10:00","11:30" -> "오전 10:00 - 11:30"
export function useFormatTime(startTime: string, endTime: string): string {
  try {
    if (!startTime && !endTime) return "";
    if (!startTime) return "";
    if (!endTime) return "";

    const s = toK12(startTime);
    const e = toK12(endTime);
    if (!s || !e) return `${startTime} - ${endTime}`;

    const same = s.meridiem === e.meridiem;
    const left = `${s.meridiem} ${s.h12}:${s.mm}`;
    const right = `${same ? "" : e.meridiem + " "}${e.h12}:${e.mm}`;
    return `${left} - ${right}`.trim();
  } catch {
    return `${startTime} - ${endTime}`;
  }
}

// "14:00" -> "오후 2시"
// "10:30" -> "오전 10시 30분"
// "14:00:00" -> "오후 2시" (초 단위 제거)
export function useFormatSingleTime(time: string): string {
  try {
    if (!time) return "";
    
    // 초 단위 제거 (HH:MM:SS -> HH:MM)
    const timePart = time.split(':').slice(0, 2).join(':');
    
    const t = toK12(timePart);
    if (!t) return time;
    
    // 분이 00이면 시만 표시, 아니면 시 분 모두 표시
    const minutePart = t.mm === "00" ? "" : ` ${parseInt(t.mm, 10)}분`;
    return `${t.meridiem} ${t.h12}시${minutePart}`;
  } catch {
    return time;
  }
}

/**
 * 상대 시간 표시 함수
 * @param dateString ISO 형식의 날짜 문자열
 * @returns "방금 전", "n시간 전", "n일 전" 또는 "11월 2일"
 */
export function useRelativeTime(dateString: string): string {
  try {
    if (!dateString) return "";
    
    const targetDate = new Date(dateString);
    const now = new Date();
    
    if (isNaN(targetDate.getTime())) return dateString;
    
    const diffMs = now.getTime() - targetDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // 1시간 이내
    if (diffMinutes < 60) {
      return "방금 전";
    }
    
    // 24시간 이내
    if (diffHours < 24) {
      return `${diffHours}시간 전`;
    }
    
    // 7일 이내
    if (diffDays < 7) {
      return `${diffDays}일 전`;
    }
    
    // 7일 이상이면 날짜 표시 (11월 2일)
    return formatKDate(dateString, false);
  } catch (error) {
    console.error("상대 시간 변환 실패:", error);
    return dateString;
  }
}

/**
 * 날짜가 오늘인지 내일인지 판단
 * @param dateString ISO 형식의 날짜 문자열
 * @returns "오늘", "내일", 또는 null
 */
export function checkTodayOrTomorrow(dateString: string): "오늘" | "내일" | null {
  try {
    if (!dateString) return null;
    
    const targetDate = new Date(dateString);
    const now = new Date();
    
    if (isNaN(targetDate.getTime())) return null;
    
    // 날짜만 비교하기 위해 시간 제거
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    
    const diffMs = targetStart.getTime() - todayStart.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "오늘";
    if (diffDays === 1) return "내일";
    
    return null;
  } catch (error) {
    console.error("오늘/내일 판단 실패:", error);
    return null;
  }
}



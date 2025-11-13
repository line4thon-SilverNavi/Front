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

// 내부 헬퍼: 24h → 12h + 오전/오후
function toK12full(h: number, m: number, s: number) {
  const isAM = h < 12;
  const h12 = ((h + 11) % 12) + 1; // 0,12 -> 12, 13->1 ...
  return {
    meridiem: isAM ? "오전" : "오후",
    h12,
    mm: String(m).padStart(2, "0"),
    ss: String(s).padStart(2, "0"),
  };
}

// "2025-11-13T00:35:23.966645"
// "2025. 11. 13. 오전 12:35:23"
export function formatKDateTimeFull(dateString: string): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();

  const t = toK12full(h, m, s);

  return `${year}. ${month}. ${day}. ${t.meridiem} ${t.h12}:${t.mm}:${t.ss}`;
}

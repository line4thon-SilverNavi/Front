export type inquaryTypeCode = "일반 문의" | "시설 이용 문의" | "비용 문의" | "방문 예약";

export const INQUARY_OPTIONS: Array<{ value: inquaryTypeCode; label: string }> = [
  { value: "일반 문의", label: "일반 문의" },
  { value: "시설 이용 문의", label: "시설 이용 문의" },
  { value: "비용 문의", label: "비용 문의" },
  { value: "방문 예약", label: "방문 예약" },
];

export const inquaryTypeLabel = (code?: inquaryTypeCode) =>
  INQUARY_OPTIONS.find((o) => o.value === code)?.label ?? "";

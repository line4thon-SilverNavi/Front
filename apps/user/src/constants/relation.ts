export type RelationCode = "parent" | "spouse" | "child" | "sibling";

export const RELATION_OPTIONS: Array<{ value: RelationCode; label: string }> = [
  { value: "parent", label: "본인" },
  { value: "spouse", label: "배우자" },
  { value: "child", label: "자녀" },
  { value: "sibling", label: "형제/자매" },
];

export const relationLabel = (code?: RelationCode) =>
  RELATION_OPTIONS.find((o) => o.value === code)?.label ?? "";

// API용 한글 변환 (백엔드가 한글로 받음)
export const relationToApi = (code?: RelationCode): "본인" | "배우자" | "자녀" | "형제/자매" | undefined => {
  if (!code) return undefined;
  const mapping: Record<RelationCode, "본인" | "배우자" | "자녀" | "형제/자매"> = {
    parent: "본인",
    spouse: "배우자",
    child: "자녀",
    sibling: "형제/자매",
  };
  return mapping[code];
};

// API에서 받은 한글을 코드로 변환
export const relationFromApi = (apiValue?: string): RelationCode | undefined => {
  if (!apiValue) return undefined;
  const mapping: Record<string, RelationCode> = {
    "본인": "parent",
    "배우자": "spouse",
    "자녀": "child",
    "형제/자매": "sibling",
  };
  return mapping[apiValue];
};

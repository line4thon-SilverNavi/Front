export const STATUS_STYLE_MAP = {
  승인: {
    color: "#409EE3",
    bg: "#EEF8FF",
    border: "#409EE3",
  },
  확인됨: {
    color: "#409EE3",
    bg: "#EEF8FF",
    border: "#409EE3",
  },
  대기중: {
    color: "#FF9500",
    bg: "#FEFCE8",
    border: "#FF9500",
  },
  거부: {
    color: "#FF3737",
    bg: "#FEF2F2",
    border: "#FF3737",
  },
  완료: {
    color: "#FF3737",
    bg: "#FEF2F2",
    border: "#FF3737",
  },
} as const;

export type StatusType = keyof typeof STATUS_STYLE_MAP;

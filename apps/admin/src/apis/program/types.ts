export type Category = "건강" | "문화" | "치료";

export type ProgramDetail = {
  programId: number;
  name: string;
  category: Category;
  instructorName: string | null;
  date: string;
  startTime: string;
  endTime: string;
  location: string | null;
  capacity: number | null;
  fee: string | null;
  number: string | null;
  description: string | null;
  supplies: string[] | null;
  proposalUrl?: string | null;
  imageUrls?: string[] | null;
};

export type PatchProgramPayload = {
  name: string | null;
  category: Category | null;
  instructorName: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  location: string | null;
  capacity: number | null;
  fee: string | null;
  number: string | null;
  description: string | null;
  supplies: string[] | null;

  // 파일/이미지
  proposal?: File | null;
  isDeleteProposal?: boolean;
  newImages?: File[] | null;
  existingImageUrls?: string[] | null;
};

// 공통 응답 래퍼
export type ApiEnvelope<T> = {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: T;
};

import { getResponse } from "@core/api/instance";

export type ProgramItem = {
  programId: number;
  programName: string;
  location: string;
  category: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  currentApplicants: number;
  capacity: number;
  fee: string;
};

export type PageInfo = {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
};

export type GetProgramsReq = {
  category?: "건강" | "문화" | "치료";
  page?: number;
};

export type GetProgramsRes = {
  isSuccess: boolean;
  data: {
    programs: ProgramItem[];
    pageInfo: PageInfo;
  };
};

export async function getPrograms(
  params?: GetProgramsReq
): Promise<GetProgramsRes | null> {
  const search = new URLSearchParams();

  if (params?.category) search.append("category", params.category);
  if (params?.page) search.append("page", String(params.page));

  const query = search.toString() ? `?${search.toString()}` : "";
  return await getResponse<GetProgramsRes>(`/api/programs${query}`);
}

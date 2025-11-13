// src/apis/program/searchPrograms.ts
import instance from "@core/api/instance";
import type { ProgramItem } from "@apis/program/getPrograms";
import type { ApiEnvelope } from "@apis/program/types"; // 이미 있던 공통 타입

export async function searchPrograms(rawQuery: string): Promise<ProgramItem[]> {
  // 백엔드가 공백 처리를 안 해주니까 여기서 정리
  const keyword = rawQuery.trim();

  if (!keyword) {
    // 빈 검색어면 그냥 빈 배열 리턴 – 상위에서 기본 목록으로 되돌릴 거라서
    return [];
  }

  // ❗ 파라미터 이름은 백엔드에서 실제로 쓰는 이름에 맞춰줘야 함
  // ex) keyword, q, name, query 등
  const res = await instance.get<ApiEnvelope<ProgramItem[]>>(
    "/api/programs/search",
    {
      params: {
        keyword, // 여기 이름이 백엔드와 맞아야 함
      },
    }
  );

  if (!res.data?.isSuccess) {
    throw new Error(res.data?.message || "프로그램 검색에 실패했습니다.");
  }

  return res.data.data;
}

// src/hooks/programs/usePrograms.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getPrograms, type ProgramItem } from "@apis/program/getPrograms";
// import { deleteProgram } from "@apis/program/deleteProgram";

export type CategoryFilter = "전체" | "건강" | "문화" | "치료";

export function usePrograms() {
  const [category, setCategory] = useState<CategoryFilter>("전체");
  const [query, setQuery] = useState(""); // 🔍 검색어
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ProgramItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 최신 요청만 반영(경쟁 요청/빠른 전환 방지)
  const reqSeq = useRef(0);

  const params = useMemo(
    () => ({
      category: category === "전체" ? undefined : category,
      page,
      // 백엔드가 지원하면 붙이고, 아니면 주석 처리
      // query: query.trim() || undefined,
    }),
    [category, page /* , query */]
  );

  const fetchList = useCallback(async () => {
    const mySeq = ++reqSeq.current;
    setLoading(true);
    setError(null);
    try {
      const res = await getPrograms(params);
      // 최신 요청만 반영
      if (mySeq !== reqSeq.current) return;

      if (res?.isSuccess) {
        const list = res.data.programs ?? [];
        const pi = res.data.pageInfo;

        setItems(list);
        setTotal(pi?.totalElements ?? list.length);
        setTotalPages(Math.max(1, pi?.totalPages ?? 1));
      } else {
        setError("목록을 불러오지 못했습니다.");
      }
    } catch (e: any) {
      if (mySeq !== reqSeq.current) return;
      setError(e?.message || "요청 중 오류가 발생했습니다.");
    } finally {
      if (mySeq === reqSeq.current) setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // 🔥 삭제 핸들러 (낙관적 업데이트 + 빈 페이지 보정)
  const removeById = useCallback(
    async (programId: number) => {
      // 낙관적 제거
      setItems((prev) => prev.filter((p) => p.programId !== programId));
      setTotal((t) => Math.max(0, t - 1));

      try {
        // await deleteProgram(programId); // DELETE /api/programs/{programId}
      } catch (e) {
        // 실패 시 롤백 겸 전체 리패치
        await fetchList();
        throw e;
      }

      // 현재 페이지가 비었으면 한 페이지 앞으로 이동
      // (이동 후 useEffect가 자동으로 fetchList 다시 호출)
      setTimeout(() => {
        setItems((cur) => {
          if (cur.length === 0 && page > 1) {
            setPage((p) => p - 1);
          } else {
            // 비어있지 않으면 최신화
            fetchList();
          }
          return cur;
        });
      }, 0);
    },
    [fetchList, page]
  );

  // 카테고리/검색 변경 시 페이지 초기화 (원한다면)
  // useEffect(() => { setPage(1); }, [category, query]);

  return {
    // state
    category,
    setCategory,
    query,
    setQuery,
    page,
    setPage,
    items,
    total,
    totalPages,
    loading,
    error,

    // actions
    refetch: fetchList,
    removeById,
  };
}

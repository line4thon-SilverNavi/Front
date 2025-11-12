import { useCallback, useEffect, useState } from "react";
import { getPrograms, type ProgramItem } from "@apis/program/getPrograms";

export type CategoryFilter = "전체" | "건강" | "문화" | "치료";

export function usePrograms() {
  const [category, setCategory] = useState<CategoryFilter>("전체");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ProgramItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPrograms({
        category: category === "전체" ? undefined : category,
        page,
      });
      if (res?.isSuccess) {
        const list = res.data.programs ?? [];
        const pi = res.data.pageInfo;

        setItems(list);
        setTotal(pi?.totalElements ?? list.length);
        setTotalPages(Math.max(1, pi?.totalPages ?? 1));
      }
    } finally {
      setLoading(false);
    }
  }, [category, page]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return {
    category,
    setCategory,
    page,
    setPage,
    items,
    total,
    totalPages,
    loading,
    refetch: fetchList,
  };
}

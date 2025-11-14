import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

import type { CounselSummary } from "@components/counsel/StatusCard";
import {
  getConsultManagement,
  type ConsultItem,
  type ConsultStatus,
} from "@apis/consult/getConsult";
import type { ConsultCategory } from "@apis/consult/getConsultDetail";

import type { PageInfo } from "@apis/program/getPrograms";
import CounselStatusCard from "@components/counsel/StatusCard";
import RequestSearchBar, {
  type StatusFilter,
} from "@components/request/RequestSearchBar";
import ConsultList from "@components/counsel/CounselList";
import ConsultDetailModal from "@components/counsel/CounselDetailModal";
import { searchConsults } from "@apis/consult/searchConsults";
import Pagination from "@components/common/pagination";

const DEFAULT_SUMMARY: CounselSummary = {
  totalCount: 0,
  pendingCount: 0,
  completedCount: 0,
  approvedCount: 0,
};

const Consult = () => {
  const [summary, setSummary] = useState<CounselSummary>(DEFAULT_SUMMARY);
  const [consults, setConsults] = useState<ConsultItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  const [statusFilter, setStatusFilter] = useState<ConsultStatus | "전체">(
    "전체"
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 상세 모달 관련 state
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ConsultCategory | null>(null);

  // 검색어
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const [localConsults, setLocalConsults] = useState<ConsultItem[] | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getConsultManagement({
          page,
          status: statusFilter,
          keyword: query,
        });

        setSummary({
          totalCount: data.summary.totalCount,
          pendingCount: data.summary.pendingCount,
          completedCount: data.summary.completedCount,
          approvedCount: data.summary.approvedCount,
        });
        setConsults(data.consults);
        setPageInfo(data.pageInfo);
      } catch (e: any) {
        toast.error(e?.message || "상담 관리 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [page, statusFilter, query]);

  const STATUS_OPTIONS: StatusFilter[] = ["전체", "대기중", "확인됨", "완료"];

  const handleSearchSubmit = useCallback(async (raw: string) => {
    const keyword = raw.trim();
    setQuery(raw);

    if (!keyword) {
      setLocalConsults(null);
      setPage(1);
      return;
    }

    try {
      setSearching(true);
      const result = await searchConsults(keyword);
      setLocalConsults(result);
      setPage(1);
    } catch (e: any) {
      toast.error(e?.message || "상담 검색에 실패했습니다.");
    } finally {
      setSearching(false);
    }
  }, []);

  /* ---------- 모달 열기 / 닫기 ---------- */

  const openDetail = (id: number, category: ConsultCategory) => {
    setSelectedId(id);
    setSelectedCategory(category);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setSelectedId(null);
    setSelectedCategory(null);
  };

  /* ---------- 모달에서 상태 변경 시 리스트/요약 반영 ---------- */

  const handleModalStatusChange = (next: ConsultStatus) => {
    if (!selectedId) return;

    setConsults((prev) => {
      const nextConsults = prev.map((c) =>
        c.consultId === selectedId ? { ...c, status: next } : c
      );

      // 요약도 즉시 재계산해서 카드에 반영
      const nextSummary: CounselSummary = {
        totalCount: nextConsults.length,
        pendingCount: nextConsults.filter((c) => c.status === "대기중").length,
        completedCount: nextConsults.filter((c) => c.status === "완료").length,
        approvedCount: nextConsults.filter((c) => c.status === "확인됨").length,
      };
      setSummary(nextSummary);

      return nextConsults;
    });
  };

  return (
    <PageWrapper>
      {/* 상태 요약 카드 */}
      <CounselStatusCard summary={summary} />
      <RequestSearchBar
        status={statusFilter}
        onStatusChange={(s) => {
          setStatusFilter(s as ConsultStatus | "전체");
          setPage(1);
        }}
        query={query}
        onQueryChange={(q) => {
          setQuery(q);
          setPage(1);
        }}
        onSubmit={handleSearchSubmit}
        placeholder="이름, 연락처로 검색"
        statusOptions={STATUS_OPTIONS}
      />

      {/* 상담 리스트 영역 */}
      <ListWrapper aria-busy={loading}>
        <ConsultList
          items={localConsults ?? consults}
          loading={loading || searching}
          onManageClick={(id, category) => openDetail(id, category)}
        />
      </ListWrapper>

      {/* 페이지네이션 */}
      {!localConsults && pageInfo && pageInfo.totalPages > 1 && (
        <Pagination
          totalPages={pageInfo.totalPages}
          currentPage={page}
          onChange={setPage}
        />
      )}

      <ConsultDetailModal
        open={detailOpen}
        consultId={selectedId}
        category={selectedCategory}
        onClose={closeDetail}
        onStatusChange={handleModalStatusChange}
      />
    </PageWrapper>
  );
};

export default Consult;

/* ---------- styles ---------- */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ListWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

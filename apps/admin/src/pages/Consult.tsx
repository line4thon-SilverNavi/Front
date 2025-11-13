// src/pages/consult/Consult.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import type { CounselSummary } from "@components/counsel/StatusCard";
import {
  getConsultManagement,
  type ConsultItem,
  type ConsultStatus,
} from "@apis/consult/getConsult";
import type { PageInfo } from "@apis/program/getPrograms";
import CounselStatusCard from "@components/counsel/StatusCard";
import RequestSearchBar, {
  type StatusFilter,
} from "@components/request/RequestSearchBar";

const DEFAULT_SUMMARY: CounselSummary = {
  totalCount: 0,
  pendingCount: 0,
  completedCount: 0,
  canceledCount: 0,
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

  // 검색어
  const [query, setQuery] = useState("");

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
          canceledCount: 0,
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

  return (
    <PageWrapper>
      <HeaderRow>
        <h1>상담 관리</h1>
      </HeaderRow>

      <RequestSearchBar
        status={statusFilter}
        onStatusChange={(s) => setStatusFilter(s as ConsultStatus | "전체")}
        query={query}
        onQueryChange={(q) => {
          setQuery(q);
          setPage(1);
        }}
        placeholder="이름, 연락처로 검색"
        statusOptions={STATUS_OPTIONS}
      />

      {/* 상태 요약 카드 */}
      <CounselStatusCard summary={summary} />

      {/* 상담 리스트 영역 */}
      <ListWrapper aria-busy={loading}>
        {consults.length === 0 && !loading && (
          <EmptyText>조회된 상담이 없습니다.</EmptyText>
        )}

        {consults.map((c) => (
          <Row key={c.consultId}>
            <div className="left">
              <p className="name">
                {c.name}{" "}
                {c.relationRole && (
                  <span className="relation">({c.relationRole})</span>
                )}
              </p>
              <p className="meta">
                {c.consultDate} · {c.consultCategory}
              </p>
            </div>
            <div className="right">
              <p className="phone">{c.phone}</p>
              <StatusBadge>{c.status}</StatusBadge>
            </div>
          </Row>
        ))}
      </ListWrapper>

      {/* 페이지네이션 */}
      {pageInfo && pageInfo.totalPages > 1 && (
        <PaginationBar>
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            이전
          </button>
          <span>
            {pageInfo.currentPage} / {pageInfo.totalPages}
          </span>
          <button
            disabled={page >= pageInfo.totalPages}
            onClick={() => setPage((p) => Math.min(pageInfo.totalPages, p + 1))}
          >
            다음
          </button>
        </PaginationBar>
      )}
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

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    ${({ theme }) => theme.fonts.heading2};
    color: ${({ theme }) => theme.colors.gray07};
  }
`;

const ListWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  padding: 16px 18px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray01};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  .name {
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.gray07};
  }

  .relation {
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray05};
  }

  .meta {
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray05};
    margin-top: 4px;
  }

  .phone {
    ${({ theme }) => theme.fonts.body2};
    color: ${({ theme }) => theme.colors.gray06};
    text-align: right;
  }
`;

const StatusBadge = styled.span`
  margin-top: 4px;
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  ${({ theme }) => theme.fonts.caption};
  background: ${({ theme }) => theme.colors.gray02};
  color: ${({ theme }) => theme.colors.gray06};
`;

const PaginationBar = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 12px;

  button {
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray03};
    background: white;
    ${({ theme }) => theme.fonts.body3};

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
`;

const EmptyText = styled.p`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray05};
  padding: 16px;
  text-align: center;
`;

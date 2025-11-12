import { useLayoutEffect, useMemo, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import RequestSummaryCards from "@components/request/RequestSummaryCards";
import {
  getApplications,
  type ApplicationItem,
  type ApplicationsSummary,
  type ApplicationStatus,
} from "@apis/request/getApplications";
import toast from "react-hot-toast";
import RequestSearchBar, {
  type StatusFilter,
} from "@components/request/RequestSearchBar";
import ApplicationList from "@components/request/ApplicationList";

type OutletCtx = {
  setHeader: (o: {
    title?: React.ReactNode;
    des?: React.ReactNode;
    right?: React.ReactNode;
  }) => void;
  facilityName: string;
};

const Request = () => {
  const { setHeader, facilityName } = useOutletContext<OutletCtx>();

  const [summary, setSummary] = useState<ApplicationsSummary | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    ApplicationStatus | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusFilter>("전체");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<ApplicationItem[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getApplications({ page: 1, status: statusFilter });
        if (!alive) return;
        setSummary(res.summary);
      } catch (e: any) {
        toast.error(e?.message || "신청 내역을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [statusFilter]);

  const total = summary?.totalCount ?? 0;

  const description = useMemo(
    () => `${facilityName || "시설명"} 프로그램 신청 총 ${total}건`,
    [facilityName, total]
  );

  useLayoutEffect(() => {
    setHeader({ des: <Des>{description}</Des> });
  }, [description, setHeader]);

  //검색
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getApplications({
          page: 1,
          status: status === "전체" ? undefined : status,
        });
        if (!alive) return;
        setItems(res.applications);
        // pageInfo로 Pagination도 세팅 가능
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [status /* query 제출 시 */]);

  return (
    <Wrap>
      {/* 상단 요약 카드 */}
      {summary && (
        <RequestSummaryCards
          summary={summary}
          onClickCard={(st) => setStatusFilter(st)}
        />
      )}

      <RequestSearchBar
        status={status}
        onStatusChange={(s) => {
          setStatus(s); /* setPage(1) 등 */
        }}
        query={query}
        onQueryChange={setQuery}
        onSubmit={() => {
          /* 검색 제출 -> refetch */
        }}
      />

      <ApplicationList
        items={items}
        loading={loading}
        onManageClick={(id) => {
          /* 상세/모달 열기 */
        }}
        onRowClick={(id) => {
          /* 행 클릭 액션(선택) */
        }}
      />
    </Wrap>
  );
};

export default Request;

/* ---------- styled ---------- */
const Wrap = styled.div`
  display: grid;
  gap: 16px;
`;

const Des = styled.p`
  color: ${({ theme }) => theme.colors.gray05};
  font-size: 20px;
  font-weight: 400;
`;

const Loading = styled.div`
  color: ${({ theme }) => theme.colors.gray05};
`;

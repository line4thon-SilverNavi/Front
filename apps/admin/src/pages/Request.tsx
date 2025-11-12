import { useLayoutEffect, useMemo, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import RequestSummaryCards from "@components/request/RequestSummaryCards";
import {
  getApplications,
  type ApplicationsSummary,
  type ApplicationStatus,
} from "@apis/request/getApplications";
import toast from "react-hot-toast";
import RequestSearchBar, {
  type StatusFilter,
} from "@components/request/RequestSearchBar";

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
        const res = await getApplications({
          page: 1,
          status: status === "전체" ? undefined : status, // API 규격: 전체는 파라미터 미전달
        });
        if (!alive) return;
        // summary, applications, pageInfo 세팅…
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, [status /*, query 제출 시 트리거 */]);

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

import {
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
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
import ApplicationDetailModal from "@components/request/ApplicationDetailModal";
import RejectApplicationModal from "@components/request/RejectApplicationModal";
import { searchRequests } from "@apis/request/searchRequests";

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
  const [localItems, setLocalItems] = useState<ApplicationItem[] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [rejectTarget, setRejectTarget] = useState<{
    id: number | null;
    applicantName: string;
    programName: string;
  } | null>(null);

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
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [status]);

  // 검색
  const handleSearchSubmit = useCallback(async (raw: string) => {
    const keyword = raw.trim();
    setQuery(raw);

    if (!keyword) {
      setLocalItems(null);
      return;
    }

    try {
      setLoading(true);
      const result = await searchRequests(keyword);
      setLocalItems(result);
    } catch (e: any) {
      toast.error(e?.message || "신청 검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  //모달 열기

  const handleStatusChange = useCallback(
    (id: number | null, nextStatus: ApplicationStatus) => {
      if (!id) return;

      setItems((prev) =>
        prev.map((item) =>
          item.applicationId === id ? { ...item, status: nextStatus } : item
        )
      );

      (async () => {
        try {
          const res = await getApplications({ page: 1, status: statusFilter });
          setSummary(res.summary);
        } catch {}
      })();
    },
    [statusFilter]
  );

  const handleManageClick = useCallback((applicationId: number) => {
    setDetailId(applicationId);
    setDetailOpen(true);
  }, []);

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
          setStatus(s);
        }}
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSearchSubmit}
      />
      <ApplicationList
        items={localItems ?? items}
        loading={loading}
        onManageClick={handleManageClick}
      />
      <ApplicationDetailModal
        open={detailOpen}
        applicationId={detailId}
        onClose={() => {
          setDetailOpen(false);
          setDetailId(null);
        }}
        onOpenRejectModal={(id) => {
          const target = items.find((a) => a.applicationId === id);
          setRejectTarget({
            id,
            applicantName: target?.applicantName ?? "",
            programName: target?.programName ?? "",
          });
          setDetailOpen(false);
        }}
        onStatusChange={(s) => handleStatusChange(detailId, s)}
      />
      <RejectApplicationModal
        open={!!rejectTarget}
        applicationId={rejectTarget?.id ?? null}
        applicantName={rejectTarget?.applicantName ?? ""}
        programName={rejectTarget?.programName ?? ""}
        onClose={() => setRejectTarget(null)}
        onStatusChange={(s) => handleStatusChange(rejectTarget?.id ?? null, s)}
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

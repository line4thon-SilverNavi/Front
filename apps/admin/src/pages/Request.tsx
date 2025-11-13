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
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [status]);

  //모달 열기

  const handleStatusChange = useCallback(
    (id: number | null, nextStatus: ApplicationStatus) => {
      if (!id) return;

      // 리스트에서 해당 신청의 상태만 갱신
      setItems((prev) =>
        prev.map((item) =>
          item.applicationId === id ? { ...item, status: nextStatus } : item
        )
      );

      // 요약 카드도 최신으로 맞추고 싶으면 다시 fetch
      (async () => {
        try {
          const res = await getApplications({ page: 1, status: statusFilter });
          setSummary(res.summary);
        } catch {
          // 요약 새로 못 불러와도 치명적이진 않으니 토스트는 생략 가능
        }
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
        onSubmit={() => {}}
      />
      <ApplicationList
        items={items}
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
          // 거부 모달 띄울 때 상세 모달은 닫는 게 UX 상 자연스러움
          setDetailOpen(false);
        }}
        // 승인 시: 현재 detailId 기준으로 상태 업데이트
        onStatusChange={(s) => handleStatusChange(detailId, s)}
      />
      \
      <RejectApplicationModal
        open={!!rejectTarget}
        applicationId={rejectTarget?.id ?? null}
        applicantName={rejectTarget?.applicantName ?? ""}
        programName={rejectTarget?.programName ?? ""}
        onClose={() => setRejectTarget(null)}
        // 거부 시: rejectTarget.id 기준으로 상태 업데이트
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

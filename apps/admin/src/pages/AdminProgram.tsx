import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import AddProgramModal from "@components/program/AddProgramModal/AddProgramModal";
import ProgramSearchBar from "@components/program/ProgramSearchBar";
import ProgramList from "@components/program/ProgramList";
import { usePrograms } from "@hooks/programs/usePrograms";
import Pagination from "@components/program/Pagination";
import DeleteModal from "@components/program/DeleteModal";
import toast from "react-hot-toast";
import { deleteProgram } from "@apis/program/deleteProgram";
import EditProgramModal from "@components/program/EditProgramModal";
import AttendanceModal from "@components/program/attendance/AttendanceModal";
import type { ProgramItem } from "@apis/program/getPrograms";
import type { ProgramDetail } from "@apis/program/types";

type OutletCtx = {
  setHeader: (o: {
    title?: React.ReactNode;
    des?: React.ReactNode;
    right?: React.ReactNode;
  }) => void;
  facilityName: string;
};

const AdminProgram = () => {
  const { setHeader, facilityName } = useOutletContext<OutletCtx>();

  const {
    category,
    setCategory,
    items,
    total,
    totalPages,
    loading,
    page,
    setPage,
    refetch,
    removeById,
  } = usePrograms();

  const [localItems, setLocalItems] = useState<ProgramItem[] | null>(null);
  const visibleItems = localItems ?? items;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [attOpen, setAttOpen] = useState(false);
  const [attPid, setAttPid] = useState<number | null>(null);

  const description = useMemo(
    () => `${facilityName || "시설명"}에서 운영하는 총 ${total}개의 프로그램`,
    [facilityName, total]
  );

  const handleSearchSubmit = useCallback(
    (q: string) => {
      // TODO: 검색 파라미터 연결
      refetch();
    },
    [refetch]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await deleteProgram(deleteId);
      removeById(deleteId);
      setLocalItems((prev) =>
        prev ? prev.filter((it) => it.programId !== deleteId) : prev
      );
      toast.success("삭제되었습니다.");
    } catch {
      toast.error("삭제 중 오류가 발생했습니다.");
      return;
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
      setDeleteId(null);
    }
  }, [deleteId, removeById]);

  useLayoutEffect(() => {
    setHeader({
      des: <Des>{description}</Des>,
      right: (
        <RightWrap>
          <AddBtn onClick={() => setOpen(true)}>
            <Plus aria-hidden>＋</Plus>새 프로그램 추가
          </AddBtn>
        </RightWrap>
      ),
    });
  }, [description, setHeader]);

  const mergeDetailIntoItem = useCallback(
    (prev: ProgramItem, d: ProgramDetail): ProgramItem => {
      return {
        programId: prev.programId,
        programName: d.name ?? prev.programName,
        category: (d.category as ProgramItem["category"]) ?? prev.category,
        date: d.date ?? prev.date,
        dayOfWeek: prev.dayOfWeek,
        startTime: d.startTime ?? prev.startTime,
        endTime: d.endTime ?? prev.endTime,
        location: (d.location ?? prev.location) || "",
        currentApplicants: prev.currentApplicants,
        capacity: d.capacity ?? prev.capacity ?? null,
        fee: d.fee ?? prev.fee ?? "",
      };
    },
    []
  );

  const handleEditSuccess = useCallback(
    (updated: ProgramDetail) => {
      if (!editId) return;

      setLocalItems((prev) => {
        const base = prev ?? items;
        const next = base.map((it) =>
          it.programId === editId ? mergeDetailIntoItem(it, updated) : it
        );
        return next;
      });
    },
    [editId, items, mergeDetailIntoItem]
  );

  return (
    <Wrap>
      <ProgramSearchBar
        category={category}
        onCategoryChange={(c) => {
          setCategory(c);
          setPage(1);
          setLocalItems(null);
        }}
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSearchSubmit}
      />

      <ProgramList
        items={visibleItems}
        loading={loading}
        onEditClick={(id) => {
          setEditId(id);
          setEditOpen(true);
        }}
        onApplicantsClick={(id) => {
          setAttPid(id);
          setAttOpen(true);
        }}
        onDeleteClick={(id) => {
          setDeleteId(id);
          setDeleteOpen(true);
        }}
      />

      {/* 수정 모달 */}
      <EditProgramModal
        open={editOpen}
        programId={editId}
        onClose={() => {
          setEditOpen(false);
          setEditId(null);
        }}
        onSuccess={handleEditSuccess}
        facilityName={facilityName}
      />

      {/* 삭제 모달 */}
      <DeleteModal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteId(null);
        }}
        busy={deleting}
        onConfirm={handleConfirmDelete}
      />

      {/* 출석 모달 */}
      <AttendanceModal
        open={attOpen}
        programId={attPid}
        onClose={() => {
          setAttOpen(false);
          setAttPid(null);
        }}
        onSaved={async () => {
          // 프로그램 목록 갱신
        }}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => {
          setPage(p);
          setLocalItems(null);
        }}
      />

      <AddProgramModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={async () => {
          setOpen(false);
          await refetch();
          setLocalItems(null);
        }}
      />
    </Wrap>
  );
};

export default AdminProgram;

/* ---------- styles ---------- */
const Wrap = styled.div``;
const Des = styled.span`
  color: #6b7280;
`;
const RightWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.blue01};
  color: ${({ theme }) => theme.colors.gray01};
  ${({ theme }) => theme.fonts.heading3};
  cursor: pointer;
`;
const Plus = styled.span`
  ${({ theme }) => theme.fonts.heading3};
`;

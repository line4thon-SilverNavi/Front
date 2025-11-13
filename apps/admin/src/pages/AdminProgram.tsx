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
      // TODO: 서버 검색 파라미터 붙이면 여기서 refetch(params)
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

  return (
    <Wrap>
      <ProgramSearchBar
        category={category}
        onCategoryChange={(c) => {
          setCategory(c);
          setPage(1);
        }}
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSearchSubmit}
      />

      <ProgramList
        items={items}
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
        onSuccess={async () => {
          await refetch();
        }}
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
          // 필요 시 프로그램 목록 갱신
          await refetch();
        }}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <AddProgramModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={async () => {
          setOpen(false);
          await refetch();
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

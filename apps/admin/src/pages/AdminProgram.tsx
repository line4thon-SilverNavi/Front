import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import AddProgramModal from "@components/program/AddProgramModal/AddProgramModal";
import ProgramSearchBar from "@components/program/ProgramSearchBar";
import { usePrograms } from "@hooks/programs/usePrograms";
import ProgramList from "@hooks/programs/ProgramList";

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
    loading,
    page,
    setPage,
    refetch,
  } = usePrograms();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const description = useMemo(
    () => `${facilityName || "시설명"}에서 운영하는 총 ${total}개의 프로그램`,
    [facilityName, total]
  );

  const handleSearchSubmit = useCallback(
    (q: string) => {
      // TODO: 서버 검색 파라미터 붙일 때 이곳에서 refetch에 반영
      // 현재는 단순히 refetch만
      refetch();
    },
    [refetch]
  );

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
        onSubmit={handleSearchSubmit} // ✅ 안정적인 콜백 전달
      />

      <ProgramList items={items} loading={loading} />

      <Pager>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          이전
        </button>
        <span>{page}</span>
        <button onClick={() => setPage(page + 1)}>다음</button>
      </Pager>

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
const Wrap = styled.div`
  padding: 16px 0 32px;
`;
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
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid #2f6fed;
  background: #4f83ff;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.02s,
    box-shadow 0.2s,
    background 0.2s;
  &:hover {
    background: #3b76ff;
    box-shadow: 0 4px 16px rgba(79, 131, 255, 0.25);
  }
  &:active {
    transform: translateY(1px);
  }
`;
const Plus = styled.span`
  font-size: 18px;
`;
const Pager = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  & > button {
    padding: 6px 10px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
  }
`;

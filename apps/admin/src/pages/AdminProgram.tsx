import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import AddProgramModal from "@components/program/AddProgramModal/AddProgramModal";

type OutletCtx = {
  setHeader: (o: {
    title?: React.ReactNode;
    des?: React.ReactNode;
    right?: React.ReactNode;
  }) => void;
};

const AdminProgram = () => {
  const { setHeader } = useOutletContext<OutletCtx>();
  const [facilityName, setFacilityName] = useState("행복노인요양원");
  const [programCount, setProgramCount] = useState<number>(6);
  const [open, setOpen] = useState(false);
  const description = useMemo(
    () => `${facilityName}에서 운영하는 총 ${programCount}개의 프로그램`,
    [facilityName, programCount]
  );
  useEffect(() => {
    setHeader({
      des: <Des>{description}</Des>,
      right: (
        <RightWrap>
          <AddBtn type="button" onClick={() => setOpen(true)}>
            <Plus aria-hidden>＋</Plus>새 프로그램 추가
          </AddBtn>
        </RightWrap>
      ),
    });
  }, [description, setHeader]);

  return (
    <Wrap>
      {/* 모달 */}
      <AddProgramModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          setProgramCount((c) => c + 1);
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
    transform 0.02s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &:hover {
    background: #3b76ff;
    box-shadow: 0 4px 16px rgba(79, 131, 255, 0.25);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const Plus = styled.span`
  display: inline-block;
  line-height: 1;
  font-size: 18px;
`;

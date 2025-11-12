import { useState } from "react";
import styled from "styled-components";
import AddProgramModal from "@components/program/AddProgramModal";

const AdminProgram = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Trigger onClick={() => setOpen(true)}>와</Trigger>

      {/* 모달 */}
      <AddProgramModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          // 필요하면 새로고침이나 목록 갱신 로직 여기에
        }}
      />
    </Container>
  );
};

export default AdminProgram;

/* ---------- styles ---------- */
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Trigger = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  background: #f3f6ff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #e0e7ff;
  }
`;

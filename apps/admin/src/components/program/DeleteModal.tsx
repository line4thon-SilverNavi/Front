import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Backdrop } from "../program/AddProgramModal/modal.styles";
import { Button, ButtonLayout } from "@core/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  busy?: boolean;
};

export default function DeleteModal({
  open,
  onConfirm,
  onClose,
  busy = false,
}: Props) {
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => cancelBtnRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Backdrop role="dialog" aria-modal="true" onClick={onClose}>
      <DeleteSheet onClick={(e) => e.stopPropagation()}>
        <Box>
          <Icon src="/img/program/warning.svg" alt="" />
          <Title>프로그램을 삭제하시겠습니까?</Title>
          <Desc>삭제 이후에는 본 작업은 되돌릴 수 없습니다.</Desc>

          <ButtonLayout type="row" gap={22}>
            <Button
              tone="disabled"
              variant="outlineV2"
              size="modal"
              radius="10px"
              typo="heading1"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              tone="red"
              variant="solid"
              size="modal"
              radius="10px"
              typo="heading1"
              onClick={onConfirm}
              disabled={busy}
            >
              {busy ? "삭제 중입니다" : "삭제하기"}
            </Button>
          </ButtonLayout>
        </Box>
      </DeleteSheet>
    </Backdrop>
  );
}

const Box = styled.div`
  display: grid;
  justify-items: center;
  gap: 14px;
`;

const DeleteSheet = styled.div`
  width: 658px;
  background: #fff;
  border-radius: 40px;
  padding: 60px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const Title = styled.h3`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.gray07};
  ${({ theme }) => theme.fonts.heading1};
  text-align: center;
`;

const Desc = styled.p`
  margin: 0;
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray06};
  text-align: center;
  margin-bottom: 3rem;
`;

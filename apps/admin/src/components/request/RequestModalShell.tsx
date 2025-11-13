// 출석 확인 / 신청 거부 / 상담 상세 정보 모달에서 공통으로 사용하는 기본 모달 레이아웃

import type { ReactNode, MouseEvent } from "react";
import * as S from "@components/program/AddProgramModal/modal.styles";

type RequestModalShellProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function RequestModalShell({
  open,
  onClose,
  children,
}: RequestModalShellProps) {
  if (!open) return null;

  const handleSheetClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <S.Backdrop role="dialog" aria-modal="true" onClick={onClose}>
      <S.Sheet onClick={handleSheetClick}>{children}</S.Sheet>
    </S.Backdrop>
  );
}

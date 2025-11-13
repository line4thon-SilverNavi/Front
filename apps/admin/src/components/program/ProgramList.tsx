import styled from "styled-components";
import ProgramItemRow from "./ProgramItemRow";
import type { ProgramItem } from "@apis/program/getPrograms";
import {
  TableWrap,
  TableHeader,
  HCell,
  Body,
} from "@components/common/GridTable";

type Props = {
  items: ProgramItem[];
  loading?: boolean;
  onItemClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
  onApplicantsClick?: (id: number) => void;
};

const COLS = "1.5fr 0.8fr 1.4fr 1.2fr 0.9fr 1.5fr";

export default function ProgramList({
  items,
  loading = false,
  onItemClick,
  onEditClick,
  onDeleteClick,
  onApplicantsClick,
}: Props) {
  const hasData = (items?.length ?? 0) > 0;

  return (
    <TableWrap $cols={COLS} style={{ ["--program-cols" as any]: COLS }}>
      <TableHeader>
        <HCell>프로그램명</HCell>
        <HCell>카테고리</HCell>
        <HCell>일정</HCell>
        <HCell>신청 현황</HCell>
        <HCell>참가비</HCell>
        <HCell $align="center">관리</HCell>
      </TableHeader>

      {loading ? (
        <Empty>조회 중입니다.</Empty>
      ) : hasData ? (
        <Body role="list">
          {items.map((it) => (
            <ProgramItemRow
              key={it.programId}
              item={it}
              onClick={onItemClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onApplicantsClick={onApplicantsClick}
            />
          ))}
        </Body>
      ) : (
        <Empty>프로그램이 없습니다.</Empty>
      )}
    </TableWrap>
  );
}

const Empty = styled.div`
  padding: 28px;
  text-align: center;
  color: #64748b;
  background: ${({ theme }) => theme.colors.gray01};
  border-radius: 12px;
  border: 0.636px solid ${({ theme }) => theme.colors.gray03};
`;

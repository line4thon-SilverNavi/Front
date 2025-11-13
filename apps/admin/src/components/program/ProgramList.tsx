import styled from "styled-components";
import ProgramItemRow from "./ProgramItemRow";
import type { ProgramItem } from "@apis/program/getPrograms";

type Props = {
  items: ProgramItem[];
  loading?: boolean;
  onItemClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
  onApplicantsClick?: (id: number) => void;
  rightSlotOf?: (item: ProgramItem) => React.ReactNode;
};

export default function ProgramList({
  items,
  loading,
  onItemClick,
  onEditClick,
  onDeleteClick,
  onApplicantsClick,
}: Props) {
  return (
    <Wrap>
      <Header>
        <HCell>프로그램명</HCell>
        <HCell>카테고리</HCell>
        <HCell>일정</HCell>
        <HCell>신청 현황</HCell>
        <HCell>참가비</HCell>
        <HCell $align="center">관리</HCell>
      </Header>

      {loading ? (
        <Empty>조회 중입니다.</Empty>
      ) : (
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
      )}
    </Wrap>
  );
}

/* ---------- styles ---------- */

const Wrap = styled.div`
  --program-cols: 1.5fr 0.8fr 1.4fr 1.2fr 0.9fr 1.5fr;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #ffffff;
  overflow: hidden;
  margin-top: 20px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 1.4fr 1.2fr 0.9fr 1.5fr;
  align-items: center;
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.gray02};
  border-bottom: 0.636px solid ${({ theme }) => theme.colors.gray02};
`;

const HCell = styled.div<{ $align?: "left" | "center" | "right" }>`
  ${({ theme }) => theme.fonts.title2};
  color: ${({ theme }) => theme.colors.gray06};
  text-align: ${({ $align }) => $align || "left"};
`;

const Body = styled.div`
  display: flex;
  display: grid;
`;

const Empty = styled.div`
  padding: 28px;
  text-align: center;
  color: #64748b;
  background: #ffffff;
`;

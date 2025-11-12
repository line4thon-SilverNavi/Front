import styled from "styled-components";
import type { ProgramItem } from "@apis/program/getPrograms";

type Props = {
  items: ProgramItem[];
  loading?: boolean;
  emptyText?: string;
};

export default function ProgramList({
  items,
  loading,
  emptyText = "표시할 프로그램이 없습니다.",
}: Props) {
  if (loading) return <Empty>불러오는 중…</Empty>;
  if (!items.length) return <Empty>{emptyText}</Empty>;

  return (
    <List>
      {items.map((p) => (
        <Row key={p.programId}>
          <strong>{p.programName}</strong>
          <Meta>
            <span>{p.category}</span>
            <span>
              {p.date} ({p.dayOfWeek}) {p.startTime}~{p.endTime}
            </span>
            <span>
              {p.currentApplicants}/{p.capacity}
            </span>
          </Meta>
        </Row>
      ))}
    </List>
  );
}

/* ---------- styles ---------- */
const List = styled.div`
  margin-top: 14px;
  border-top: 1px solid #e2e8f0;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eef2f7;
  strong {
    color: #0f172a;
  }
`;
const Meta = styled.div`
  display: flex;
  gap: 12px;
  color: #64748b;
  font-size: 13px;
`;
const Empty = styled.div`
  padding: 20px 0;
  color: #94a3b8;
`;

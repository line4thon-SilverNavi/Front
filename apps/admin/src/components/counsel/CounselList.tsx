import {
  EntityTableList,
  type ColumnDef,
} from "@components/common/EntityTableList";
import type { ConsultItem } from "@apis/consult/getConsult";
import ConsultRow from "./CounselRow";
import type { ConsultCategory } from "@apis/consult/getConsultDetail";
import styled from "styled-components";

type Props = {
  items: ConsultItem[];
  loading?: boolean;
  onManageClick?: (id: number, category: ConsultCategory) => void;

  onRowClick?: (id: number) => void;
};

const COLUMNS: ColumnDef[] = [
  { label: "신청일", align: "center" },
  { label: "유형", align: "center" },
  { label: "신청자", align: "center" },
  { label: "연락처", align: "center" },
  { label: "상태", align: "center" },
  { label: "관리", align: "center" },
];

export default function ConsultList({
  items,
  loading,
  onManageClick,
  onRowClick,
}: Props) {
  const hasData = (items?.length ?? 0) > 0;

  if (loading) {
    return <Empty>조회 중입니다.</Empty>;
  }

  if (!hasData) {
    return <Empty>상담 내역이 없습니다.</Empty>;
  }
  return (
    <EntityTableList<ConsultItem>
      items={items}
      loading={false}
      cols="90px 1fr 120px 1fr 160px 100px"
      columns={COLUMNS}
      renderRow={(it) => (
        <ConsultRow
          key={it.consultId}
          item={it}
          onManageClick={onManageClick}
          onRowClick={onRowClick}
        />
      )}
    />
  );
}

const Empty = styled.div`
  padding: 28px;
  text-align: center;
  color: #64748b;
  background: #ffffff;
`;

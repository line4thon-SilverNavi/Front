import {
  EntityTableList,
  type ColumnDef,
} from "@components/common/EntityTableList";
import type { ConsultItem } from "@apis/consult/getConsult";
import ConsultRow from "./CounselRow";
import type { ConsultCategory } from "@apis/consult/getConsultDetail";

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
  return (
    <EntityTableList<ConsultItem>
      items={items}
      loading={loading}
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

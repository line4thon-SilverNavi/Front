import {
  EntityTableList,
  type ColumnDef,
} from "@components/common/EntityTableList";
import ApplicationRow from "./ApplicationRow";
import type { ApplicationItem } from "@apis/request/getApplications";

type Props = {
  items: ApplicationItem[];
  loading?: boolean;
  onManageClick?: (id: number) => void;
  onRowClick?: (id: number) => void;
};

const COLUMNS: ColumnDef[] = [
  { label: "신청일", align: "center" },
  { label: "프로그램", align: "center" },
  { label: "신청자", align: "center" },
  { label: "연락처", align: "center" },
  { label: "상태", align: "center" },
  { label: "관리", align: "center" },
];

export default function ApplicationList({
  items,
  loading,
  onManageClick,
  onRowClick,
}: Props) {
  return (
    <EntityTableList<ApplicationItem>
      items={items}
      loading={loading}
      cols="110px 1fr 120px 140px 140px 80px"
      columns={COLUMNS}
      renderRow={(it) => (
        <ApplicationRow
          key={it.applicationId}
          item={it}
          onManageClick={onManageClick}
          onRowClick={onRowClick}
        />
      )}
    />
  );
}

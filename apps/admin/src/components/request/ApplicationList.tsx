import styled from "styled-components";
import {
  TableWrap,
  TableHeader,
  HCell,
  Body,
} from "@components/common/GridTable";
import ApplicationRow from "./ApplicationRow";
import type { ApplicationItem } from "@apis/request/getApplications";

type Props = {
  items: ApplicationItem[];
  loading?: boolean;
  onManageClick?: (id: number) => void;
  onRowClick?: (id: number) => void;
};

export default function ApplicationList({
  items,
  loading,
  onManageClick,
  onRowClick,
}: Props) {
  return (
    <TableWrap $cols="110px 1fr 120px 140px 140px 80px">
      <TableHeader>
        <HCell $align="center">신청일</HCell>
        <HCell $align="center">프로그램</HCell>
        <HCell $align="center">신청자</HCell>
        <HCell $align="center">연락처</HCell>
        <HCell $align="center">상태</HCell>
        <HCell $align="center">관리</HCell>
      </TableHeader>

      {loading ? (
        <Empty>불러오는 중…</Empty>
      ) : (
        <Body role="rowgroup">
          {items.map((it) => (
            <ApplicationRow
              key={it.applicationId}
              item={it}
              onManageClick={onManageClick}
              onRowClick={onRowClick}
            />
          ))}
        </Body>
      )}
    </TableWrap>
  );
}

const Empty = styled.div`
  padding: 28px;
  text-align: center;
  color: #64748b;
  background: #ffffff;
`;

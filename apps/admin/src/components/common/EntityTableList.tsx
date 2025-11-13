import styled from "styled-components";
import {
  TableWrap,
  TableHeader,
  HCell,
  Body,
} from "@components/common/GridTable";
import React from "react";

export type ColumnDef = {
  label: string;
  align?: "left" | "center" | "right";
};

type Props<T> = {
  items: T[];
  loading?: boolean;
  cols: string;
  columns: ColumnDef[];
  renderRow: (item: T) => React.ReactNode;
};

export function EntityTableList<T>({
  items,
  loading,
  cols,
  columns,
  renderRow,
}: Props<T>) {
  return (
    <TableWrap $cols={cols}>
      <TableHeader>
        {columns.map((col) => (
          <HCell key={col.label} $align={col.align ?? "left"}>
            {col.label}
          </HCell>
        ))}
      </TableHeader>

      {loading ? (
        <Empty>불러오는 중</Empty>
      ) : (
        <Body role="rowgroup">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>{renderRow(item)}</React.Fragment>
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

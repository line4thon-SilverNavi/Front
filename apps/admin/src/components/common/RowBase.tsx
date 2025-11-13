import { Row, Cell } from "@components/common/GridTable";

type Props = {
  id: number;
  onRowClick?: (id: number) => void;
  manageCell?: React.ReactNode;
  children: React.ReactNode;
};

export default function RowBase({
  id,
  onRowClick,
  manageCell,
  children,
}: Props) {
  return (
    <Row
      role="row"
      onClick={() => onRowClick?.(id)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onRowClick?.(id);
        }
      }}
    >
      {children}

      {manageCell && (
        <Cell
          $align="center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {manageCell}
        </Cell>
      )}
    </Row>
  );
}

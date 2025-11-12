import type { ApplicationItem } from "@apis/request/getApplications";
import { Row, Cell } from "@components/common/GridTable";
import styled from "styled-components";

const fmtPhone = (raw: string) => {
  const digits = raw?.replace(/\D/g, "") || "";
  if (!digits) return "";
  return digits.startsWith("02")
    ? digits.replace(/(02)(\d{3,4})(\d{4})/, "$1-$2-$3")
    : digits.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
};

export default function ApplicationRow({
  item,
  onManageClick,
  onRowClick,
}: {
  item: ApplicationItem;
  onManageClick?: (id: number) => void;
  onRowClick?: (id: number) => void;
}) {
  const {
    applicationId,
    applicationDate,
    programName,
    applicantName,
    phone,
    status,
  } = item;
  return (
    <Row role="row" onClick={() => onRowClick?.(applicationId)}>
      <Cell $align="center">{applicationDate}</Cell>
      <Cell $align="center">
        <ProgName>{programName}</ProgName>
      </Cell>
      <Cell $align="center">{applicantName}</Cell>
      <Cell $align="center">{fmtPhone(phone)}</Cell>
      <Cell $align="center">
        <Status $s={status}>{status}</Status>
      </Cell>
      <Cell $align="center" onClick={(e) => e.stopPropagation()}>
        <IconBtn
          onClick={() => onManageClick?.(applicationId)}
          aria-label="관리"
        >
          <img
            src="/img/program/application.svg"
            alt=""
            width={23}
            height={23}
          />
        </IconBtn>
      </Cell>
    </Row>
  );
}

const ProgName = styled.span`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray07};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Status = styled.span<{ $s: "대기중" | "승인" | "거부" }>`
  ${({ theme }) => theme.fonts.body3};
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ $s }) =>
    $s === "승인" ? "#e7f2ff" : $s === "대기중" ? "#fff7e6" : "#ffecec"};
  color: ${({ $s }) =>
    $s === "승인" ? "#3b82f6" : $s === "대기중" ? "#f59e0b" : "#ef4444"};
`;

const IconBtn = styled.button`
  background: transparent;
  border: 0;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #f3f4f6;
  }
`;

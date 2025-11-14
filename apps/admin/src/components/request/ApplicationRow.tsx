import type { ApplicationItem } from "@apis/request/getApplications";
import { Cell } from "@components/common/GridTable";
import styled from "styled-components";
import StatusBadge from "./StatusBadge";
import RowBase from "@components/common/RowBase";
import { fmtPhone } from "@hooks/useFmtPhone";

type Props = {
  item: ApplicationItem;
  onManageClick?: (id: number) => void;
  onRowClick?: (id: number) => void;
};

export default function ApplicationRow({
  item,
  onManageClick,
  onRowClick,
}: Props) {
  const {
    applicationId,
    applicationDate,
    programName,
    applicantName,
    phone,
    status,
  } = item;

  return (
    <RowBase
      id={applicationId}
      onRowClick={onRowClick}
      manageCell={
        <IconBtn onClick={() => onManageClick?.(applicationId)}>
          <img
            src="/img/program/application.svg"
            alt=""
            width={23}
            height={23}
          />
        </IconBtn>
      }
    >
      <Cell $align="center">
        <ProgName>{applicationDate}</ProgName>
      </Cell>
      <Cell $align="center">
        <ProgName>{programName}</ProgName>
      </Cell>
      <Cell $align="center">
        {" "}
        <AppName>{applicantName}</AppName>
      </Cell>
      <Cell $align="center">
        <Phone>{fmtPhone(phone)}</Phone>
      </Cell>
      <Cell $align="center">
        <StatusBadge status={status as "대기중" | "승인" | "거부"} />
      </Cell>
      {/* 마지막 관리 셀은 Base가 렌더링 */}
    </RowBase>
  );
}

const ProgName = styled.span`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray07};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AppName = styled.span`
  ${({ theme }) => theme.fonts.label2};
  color: ${({ theme }) => theme.colors.gray07};
`;

const Phone = styled.span`
  color: ${({ theme }) => theme.colors.gray06};
  ${({ theme }) => theme.fonts.body3};
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

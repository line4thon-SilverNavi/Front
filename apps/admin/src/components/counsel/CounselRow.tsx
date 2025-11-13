import styled from "styled-components";
import { Cell } from "@components/common/GridTable";
import type { ConsultItem } from "@apis/consult/getConsult";

import CounselStatusBadge from "./CounselStatusBadge";
import RowBase from "@components/common/RowBase";

const fmtPhone = (raw: string) => {
  const digits = raw?.replace(/\D/g, "") || "";
  if (!digits) return "";
  return digits.startsWith("02")
    ? digits.replace(/(02)(\d{3,4})(\d{4})/, "$1-$2-$3")
    : digits.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
};

type Props = {
  item: ConsultItem;
  onManageClick?: (id: number) => void;
  onRowClick?: (id: number) => void;
};

export default function ConsultRow({ item, onManageClick, onRowClick }: Props) {
  const {
    consultId,
    consultDate,
    consultCategory,
    name,
    relationRole,
    phone,
    status,
  } = item;

  return (
    <RowBase
      id={consultId}
      onRowClick={onRowClick}
      manageCell={
        <ManageBtn onClick={() => onManageClick?.(consultId)}>
          상세보기
        </ManageBtn>
      }
    >
      <Cell $align="center">
        <ProgName>{consultDate}</ProgName>
      </Cell>
      <Cell $align="center">
        <ProgName>{consultCategory}</ProgName>
      </Cell>
      <Cell $align="center">
        <NameWrap>
          {name}
          {relationRole && <Relation>({relationRole})</Relation>}
        </NameWrap>
      </Cell>
      <Cell $align="center">
        <Phone>{fmtPhone(phone)}</Phone>
      </Cell>
      <Cell $align="center">
        <CounselStatusBadge status={status} />
      </Cell>
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

const NameWrap = styled.span`
  ${({ theme }) => theme.fonts.label2};
  color: ${({ theme }) => theme.colors.gray07};
`;

const Relation = styled.span`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.gray05};
  ${({ theme }) => theme.fonts.label2};
`;

const Phone = styled.span`
  color: ${({ theme }) => theme.colors.gray06};
  ${({ theme }) => theme.fonts.body3};
`;

const ManageBtn = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.blue01};
  ${({ theme }) => theme.fonts.label2};
  color: ${({ theme }) => theme.colors.gray01};
  cursor: pointer;
`;

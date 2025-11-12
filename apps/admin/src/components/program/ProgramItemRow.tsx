import styled from "styled-components";
import type { ProgramItem } from "@apis/program/getPrograms";
import { formatKDate, useFormatTime } from "@core/hooks/ProcessingTime";

type Props = {
  item: ProgramItem;
  onClick?: (id: number) => void;
};

export default function ProgramItemRow({ item, onClick }: Props) {
  const {
    programId,
    programName,
    category,
    date,
    startTime,
    endTime,
    location,
    currentApplicants,
    capacity,
    fee,
  } = item;

  const hasCap =
    Number.isFinite(capacity as number) && (capacity as number) > 0;
  const pct = hasCap ? (currentApplicants / (capacity as number)) * 100 : 0;
  const clampPct = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

  const dateLabel = date ? formatKDate(date, true) : "";
  const timeLabel =
    startTime && endTime ? useFormatTime(startTime, endTime) : "";

  return (
    <Row6 role="button" onClick={() => onClick?.(programId)}>
      {/* 프로그램명 */}
      <Cell>
        <Title>{programName}</Title>
        {location && <Sub>{location}</Sub>}
      </Cell>

      {/* 카테고리 */}
      <Cell>
        <CatChip>{category}</CatChip>
      </Cell>

      {/* 일정 */}
      <Cell>
        {dateLabel && <Date>{dateLabel}</Date>}
        {timeLabel && <DateSub>{timeLabel}</DateSub>}
      </Cell>

      {/* 신청 현황 */}
      <Cell>
        <RowInline>
          <img src="/img/program/cnt.svg" alt="" width={16} height={16} />
          <Cnt>
            {hasCap
              ? `${currentApplicants}/${capacity}`
              : `${currentApplicants}명`}
          </Cnt>
          {!hasCap && <NoCapTag>정원 없음</NoCapTag>}
        </RowInline>

        {hasCap ? (
          <BarWrap aria-label="신청 진행률">
            <Bar style={{ width: `${clampPct(pct)}%` }} />
          </BarWrap>
        ) : (
          <BarWrap $disabled />
        )}
      </Cell>

      {/* 참가비 */}
      <Cell>
        <Fee>{fee || "없음"}</Fee>
      </Cell>

      {/* 관리 */}
      <Cell $align="center" onClick={(e) => e.stopPropagation()}>
        <CellContainer>
          <img src="/img/program/patch.svg" />
          <img src="/img/program/delete.svg" />
          <img src="/img/program/application.svg" />
        </CellContainer>
      </Cell>
    </Row6>
  );
}

const Row6 = styled.div`
  display: grid;
  grid-template-columns: var(--program-cols);
  align-items: center;
  padding: 16px 20px;
  border-bottom: 0.636px solid ${({ theme }) => theme.colors.gray02};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.gray01};
  }
`;

const Cell = styled.div<{ $align?: "left" | "center" | "right" }>`
  min-width: 0;
  text-align: ${({ $align }) => $align || "left"};
`;

const Title = styled.div`
  ${({ theme }) => theme.fonts.title2};
  color: ${({ theme }) => theme.colors.gray07};
  margin-right: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Sub = styled.div`
  margin-top: 2px;
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray05};
`;

const Date = styled.p`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray07};
`;

const DateSub = styled.p`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.gray05};
`;

const CatChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 1px 10px;
  border-radius: 21328500px;
  background: ${({ theme }) => theme.colors.blue02};
  ${({ theme }) => theme.fonts.label2};
  color: ${({ theme }) => theme.colors.blue01};
`;

const RowInline = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const Cnt = styled.p`
  ${({ theme }) => theme.fonts.title3};
  color: ${({ theme }) => theme.colors.gray07};
`;

const NoCapTag = styled.span`
  margin-left: 6px;
  padding: 2px 8px;
  background: ${({ theme }) => theme.colors.blue03};
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.blue01};
  border-radius: 999px;
`;

const Fee = styled.p`
  ${({ theme }) => theme.fonts.title2};
  color: ${({ theme }) => theme.colors.gray07};
`;

const BarWrap = styled.div<{ $disabled?: boolean }>`
  margin-top: 10px;
  width: 100px;
  height: 10px;
  background: #f3f4f6;
  border-radius: 999px;
  overflow: hidden;
  ${({ $disabled }) => $disabled && `opacity: .5;`}
`;

const Bar = styled.div`
  height: 100%;
  background: #3b82f6;
  border-radius: 999px;
  transition: width 0.25s ease;
`;

const CellContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

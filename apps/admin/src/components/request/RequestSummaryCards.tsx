import type { ApplicationsSummary } from "@apis/request/getApplications";
import {
  STATUS_STYLE_MAP,
  type StatusType,
} from "@components/common/status/statusMap";
import styled, { css } from "styled-components";

type Props = {
  summary: ApplicationsSummary;
  onClickCard?: (status: StatusType) => void;
};

export default function RequestSummaryCards({ summary, onClickCard }: Props) {
  const { pendingCount, approvedCount, rejectedCount } = summary;

  return (
    <Wrap>
      <Card status="대기중" onClick={() => onClickCard?.("대기중")}>
        <Head>
          <img src="/img/request/waiting.svg" />
          <Title>대기중</Title>
        </Head>
        <Count>{pendingCount}</Count>
      </Card>

      <Card status="승인" onClick={() => onClickCard?.("승인")}>
        <Head>
          <img src="/img/request/approve.svg" />
          <Title>승인</Title>
        </Head>
        <Count>{approvedCount}</Count>
      </Card>

      <Card status="거부" onClick={() => onClickCard?.("거부")}>
        <Head>
          <img src="/img/request/deny.svg" />
          <Title>거부</Title>
        </Head>
        <Count>{rejectedCount}</Count>
      </Card>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const Card = styled.div<{ status: StatusType }>`
  ${({ status }) => {
    const s = STATUS_STYLE_MAP[status];
    return css`
      padding: 20px;
      border-radius: 12px;
      border: 0.679px solid ${s.border};
      background: ${s.bg};
      color: ${s.color};
      cursor: pointer;
    `;
  }}
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 20px;
  }
`;

const Title = styled.span`
  ${({ theme }) => theme.fonts.title3};
`;

const Count = styled.div`
  ${({ theme }) => theme.fonts.heading1};
  margin-top: 8px;
`;

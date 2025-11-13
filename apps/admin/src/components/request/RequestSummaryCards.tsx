import type { ApplicationsSummary } from "@apis/request/getApplications";
import styled from "styled-components";

type Props = {
  summary: ApplicationsSummary;
  onClickCard?: (status?: "대기중" | "승인" | "거부") => void;
};

export default function RequestSummaryCards({ summary }: Props) {
  const { pendingCount, approvedCount, rejectedCount } = summary;

  return (
    <Wrap>
      <Card $tone="pending">
        <Head>
          <img src="/img/request/waiting.svg" />
          <Title>대기중</Title>
        </Head>
        <Count>{pendingCount}</Count>
      </Card>

      <Card $tone="approved">
        <Head>
          <img src="/img/request/approve.svg" />
          <Title>승인</Title>
        </Head>
        <Count>{approvedCount}</Count>
      </Card>

      <Card $tone="rejected">
        <Head>
          <img src="/img/request/deny.svg" />
          <Title>거부</Title>
        </Head>
        <Count>{rejectedCount}</Count>
      </Card>
    </Wrap>
  );
}

/* ---------- styled ---------- */
const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const Card = styled.div<{ $tone: "pending" | "approved" | "rejected" }>`
  padding: 20px;
  border-radius: 12px;
  border: 0.679px solid
    ${({ $tone }) =>
      $tone === "pending"
        ? "#FF9500"
        : $tone === "approved"
          ? "#409EE3"
          : "#FF6B6B"};
  background: ${({ $tone }) =>
    $tone === "pending"
      ? "#FEFCE8"
      : $tone === "approved"
        ? "#EEF8FF"
        : "#FEF2F2"};

  color: ${({ $tone }) =>
    $tone === "pending"
      ? "#FF9500"
      : $tone === "approved"
        ? "#409EE3"
        : "#FF6B6B"};
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

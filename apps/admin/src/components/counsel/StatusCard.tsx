import styled, { useTheme } from "styled-components";
import { CounselStatusItem } from "./StatusItem";

export type CounselSummary = {
  totalCount: number;
  pendingCount: number;
  completedCount: number;
  canceledCount: number;
};

type Props = {
  summary: CounselSummary;
};

export default function CounselStatusCard({ summary }: Props) {
  const theme = useTheme();

  const { totalCount, pendingCount, completedCount, canceledCount } = summary;

  const stats = [
    { label: "전체 상담", value: totalCount, color: theme.colors.gray07 },
    { label: "대기중", value: pendingCount, color: "#FFA726" },
    { label: "완료", value: completedCount, color: theme.colors.blue01 },
    { label: "취소", value: canceledCount, color: theme.colors.alert },
  ];

  return (
    <CardWrapper>
      {stats.map((s) => (
        <CounselStatusItem
          key={s.label}
          label={s.label}
          value={s.value}
          color={s.color}
        />
      ))}
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

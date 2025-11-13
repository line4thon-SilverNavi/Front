import styled from "styled-components";

type ItemProps = {
  label: string;
  value: number;
  color: string;
};

export function CounselStatusItem({ label, value, color }: ItemProps) {
  return (
    <CardContainer $color={color}>
      <p className="label">{label}</p>
      <p>
        <span className="total">{value}</span>건
      </p>
    </CardContainer>
  );
}

const CardContainer = styled.div<{ $color: string }>`
  display: flex;
  padding: 24px;
  gap: 5px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray03};
  background-color: 1px solid ${({ theme }) => theme.colors.gray01};

  .label {
    ${({ theme }) => theme.fonts.title2};
  }

  p {
    color: ${({ theme }) => theme.colors.gray04};
    ${({ theme }) => theme.fonts.title3};
  }

  .value {
    color: ${({ $color }) => $color};
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
  }
`;

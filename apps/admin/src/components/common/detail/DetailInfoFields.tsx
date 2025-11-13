import styled from "styled-components";

export type DetailInfoFieldProps = {
  iconSrc: string;
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  valueColor?: string;
};

export function DetailInfoField({
  iconSrc,
  label,
  value,
  valueColor,
}: DetailInfoFieldProps) {
  return (
    <FieldBox>
      <IconCol>
        <IconWrap>
          <img src={iconSrc} alt="" />
        </IconWrap>
      </IconCol>
      <TextCol>
        <Label>{label}</Label>
        <Value $color={valueColor}>{value}</Value>
      </TextCol>
    </FieldBox>
  );
}

export function DetailInfoFieldGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Grid>{children}</Grid>;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 32px;
`;

const FieldBox = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: center;
`;

const IconCol = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const IconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray02};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }
`;

const TextCol = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const Label = styled.div`
  ${({ theme }) => theme.fonts.label2};
  color: ${({ theme }) => theme.colors.gray05};
`;

const Value = styled.div<{ $color?: string }>`
  ${({ theme }) => theme.fonts.title1};
  color: ${({ theme, $color }) => $color ?? theme.colors.gray07};
`;

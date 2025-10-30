import styled from "styled-components";

type Props = {
  children?: string;
  margin?: string;
};

export default function OrDivider({ children = "또는" }: Props) {
  return (
    <Row role="separator">
      <Line />
      <Label>{children}</Label>
      <Line aria-hidden />
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
`;

const Line = styled.i`
  flex: 1;
  height: 1.5px;
  background: ${({ theme }) => theme.colors.gray03};
`;

const Label = styled.span`
  white-space: nowrap;
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.gray06};
`;

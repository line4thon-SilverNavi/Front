import styled from "styled-components";

type DetailHeaderCardProps = {
  iconSrc?: string;
  title: string;
  subtitle?: string;
};

export function DetailHeaderCard({ title, subtitle }: DetailHeaderCardProps) {
  return (
    <Wrap>
      <p>신청 프로그램</p>
      <Title>{title}</Title>
      <Date>
        {subtitle && (
          <>
            <img src="/img/request/date.svg" />
            <Sub>{subtitle}</Sub>
          </>
        )}
      </Date>
    </Wrap>
  );
}

/* ---------- styled ---------- */
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.blue03};
  margin-bottom: 24px;
  gap: 6px;

  p {
    color: ${({ theme }) => theme.colors.blue01};
    ${({ theme }) => theme.fonts.title3};
  }
`;

const Date = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.gray06};
  ${({ theme }) => theme.fonts.body3};
`;

const Title = styled.div`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray07};
`;

const Sub = styled.div`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray06};
`;

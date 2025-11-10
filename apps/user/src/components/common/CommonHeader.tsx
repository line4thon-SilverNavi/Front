import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { PropsWithChildren } from "react";

type CommonHeaderProps = {
  title: string;
  onBack?: () => void;
};

export default function CommonHeader({
  title,
  onBack,
}: PropsWithChildren<CommonHeaderProps>) {
  const navigate = useNavigate();
  const handleBack = () => (onBack ? onBack() : navigate(-1));

  return (
    <Wrap>
        <img src="/img/auth/back.png" onClick={handleBack} />
        <Title>{title}</Title>
        ㅤ {/*공백문자*/}
    </Wrap>
  );
}

/* styled */
const Wrap = styled.div`
    display: flex;
    background: ${({ theme }) => theme.colors.gray01};;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    img {
        width: 18px;
        height: 18px;
    };
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray07};
`;


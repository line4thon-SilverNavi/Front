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
    </Wrap>
  );
}

/* styled */
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 100%;
    min-height: 100dvh; */
    background: ${({ theme }) => theme.colors.gray01};;
    padding: 1.36rem 1.36rem calc(1.36rem + env(safe-area-inset-bottom));
    gap: 1rem;
    flex: 1;

    img {
        width: 18px;
        height: 18px;
    };
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading1};
  color: ${({ theme }) => theme.colors.gray07};
`;


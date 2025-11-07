

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { PropsWithChildren } from "react";
import BookmarkButton from "./BookmarkButton";

type DetailPageLayoutProps = {
  image: string;
  onBack?: () => void;
  bookmarkProps?: {
    initialBookmarked: boolean;
    contentId: number;
    type: string;
  };
  footer?: React.ReactNode;
};

export default function DetailPageLayout({
  image,
  onBack,
  bookmarkProps,
  footer,
  children,
}: PropsWithChildren<DetailPageLayoutProps>) {
  const navigate = useNavigate();
  const handleBack = () => (onBack ? onBack() : navigate(-1));

  return (
    <Wrap>
      <ImageContainer>
        <Image src={image} alt="상세 이미지" />
        <Header>
          <BackButton onClick={handleBack}>
            <img src="/img/auth/back.png" alt="뒤로가기" />
          </BackButton>
          {bookmarkProps && (
            <BookmarkButton
              initialBookmarked={bookmarkProps.initialBookmarked}
              contentId={bookmarkProps.contentId}
              type={bookmarkProps.type}
            />
          )}
        </Header>
      </ImageContainer>

      <Content role="main">{children}</Content>

      {footer && <Footer>{footer}</Footer>}
    </Wrap>
  );
}

/* styled */
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.gray01};
  min-height: 100dvh;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray02};
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.36rem;
  z-index: 10;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 1.36rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Footer = styled.footer`
  padding: 1rem 1.36rem calc(1rem + env(safe-area-inset-bottom));
  background: ${({ theme }) => theme.colors.gray01};
  border-top: 1px solid ${({ theme }) => theme.colors.gray02};
`;

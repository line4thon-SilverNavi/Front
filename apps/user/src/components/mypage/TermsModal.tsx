import styled from "styled-components";
import { Button } from "@core/ui/button";
import { CARE_GRADE_TERMS } from "@constants/terms";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function TermsModal({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  const onKeyDownDim = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <Dim
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onKeyDown={onKeyDownDim}
    >
      <Sheet onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{CARE_GRADE_TERMS.title}</Title>
        </Header>

        <Content>
          {CARE_GRADE_TERMS.sections.map((section, index) => (
            <Section key={index}>
              <SectionTitle>{section.title}</SectionTitle>
              {section.content.map((paragraph, pIndex) => (
                <Paragraph key={pIndex}>{paragraph}</Paragraph>
              ))}
            </Section>
          ))}
        </Content>

        <ButtonWrapper>
          <Button fullWidth tone="blue" radius="pill" size="lg" onClick={handleConfirm}>
            확인
          </Button>
        </ButtonWrapper>
      </Sheet>
    </Dim>
  );
}

/* styles */
const Dim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.4);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
  display: flex;
  justify-content: center;
`;

const Sheet = styled.div`
  width: 100%;
  max-height: 28rem;
  background: ${({ theme }) => theme.colors.gray01};
  border-radius: 20px 20px 0 0;
  padding: 1.3rem 1.3rem calc(16px + env(safe-area-inset-bottom));
  max-width: 393px;
`;

const Header = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: start;
  margin-top: 0.2rem;
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray07};
  ${({ theme }) => theme.fonts.heading2};
  text-align: center;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
  height: 15rem;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray02};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray04};
    border-radius: 3px;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h4`
  margin: 0 0 0.8rem 0;
  color: ${({ theme }) => theme.colors.gray07};
  ${({ theme }) => theme.fonts.title2};
`;

const Paragraph = styled.p`
  margin: 0 0 0.6rem 0;
  color: ${({ theme }) => theme.colors.gray06};
  ${({ theme }) => theme.fonts.body3};
  line-height: 1.6;
`;

const ButtonWrapper = styled.div`
  padding-top: 0.5rem;
`;

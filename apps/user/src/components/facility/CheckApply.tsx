import styled from "styled-components";

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    isAlreadyApplied: boolean;
};

export default function CheckApply({ open, onClose, onConfirm, isAlreadyApplied }: Props) {
    if (!open) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
                <img 
                    src={isAlreadyApplied ? "/img/apply/warning.png" : "/img/apply/check.png"} 
                    style={{width:"48px", height:"48px"}}
                />

                <Title>
                    {isAlreadyApplied 
                        ? "이미 신청한 시설입니다" 
                        : "신청하시겠습니까?"}
                </Title>

                <ButtonContainer>
                    {isAlreadyApplied ? (
                        <StyledButton $variant="close" onClick={onClose}>
                            닫기
                        </StyledButton>
                    ) : (
                        <>
                            <StyledButton $variant="cancel" onClick={onClose}>
                                취소
                            </StyledButton>
                            <StyledButton $variant="confirm" onClick={onConfirm}>
                                신청하기
                            </StyledButton>
                        </>
                    )}
                </ButtonContainer>
            </ModalWrapper>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalWrapper = styled.div`
    background: ${({ theme }) => theme.colors.gray01};
    border-radius: 16px;
    padding: 2rem 1.5rem;
    max-width: 320px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const Title = styled.h3`
    ${({ theme }) => theme.fonts.heading3};
    color: ${({ theme }) => theme.colors.gray07};
    text-align: center;
    margin: 0;
`;


const ButtonContainer = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    margin-top: 0.5rem;
    justify-content: center;
`;

const StyledButton = styled.button<{ $variant: "cancel" | "confirm" | "close"}>`
    padding: 6px 16px;
    border-radius: 8px;
    ${({ theme }) => theme.fonts.body3};
    cursor: pointer;
    transition: all 0.2s;

    ${({ $variant }) =>
        $variant === "cancel" || $variant === "confirm"
            ? `flex: 1;`
            : `min-width: 120px;`
    }

    ${({ theme, $variant }) =>
        $variant === "cancel" || $variant === "close"
            ? `
                border: 1px solid ${theme.colors.gray03};
                background: ${theme.colors.gray01};
                color: ${theme.colors.gray05};
                
                &:hover {
                    background: ${theme.colors.gray02};
                }
            `
            : `
                border: none;
                background: ${theme.colors.blue01};
                color: white;
                
                &:hover {
                    background: ${theme.colors.blue02};
                }
            `}
`;
import styled from "styled-components";

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
};

export default function CompleteProfile({ open, onClose, onConfirm }: Props) {
    if (!open) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
                <img 
                    src="/img/apply/warning.png" 
                    style={{width:"48px", height:"44px"}}
                />

                <Title>프로필을 완성해주세요</Title>
                

                <ButtonContainer>
                    <StyledButton onClick={onConfirm}>
                        프로필 수정하러가기
                    </StyledButton>
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
    ${({ theme }) => theme.fonts.heading2};
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

const StyledButton = styled.button`
    padding: 6px 16px;
    border-radius: 8px;
    ${({ theme }) => theme.fonts.label1};
    cursor: pointer;
    transition: all 0.2s;
    flex: 1;
    border: none;
    background: ${({ theme }) => theme.colors.blue01};
    color: white;
    
    &:hover {
        background: ${({ theme }) => theme.colors.blue02};
    }
`;

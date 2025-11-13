import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function ReviewSuccessModal({ open, onClose }: Props) {
    const navigate = useNavigate();

    if (!open) return null;

    const handleClose = () => {
        onClose();
        navigate("/");
    };

    return (
        <Overlay onClick={handleClose}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
                <img 
                    src="/img/apply/check.png" 
                    style={{width:"48px", height:"48px"}}
                />

                <Title>리뷰 등록이 완료되었습니다.</Title>

                <ButtonContainer>
                    <StyledButton onClick={handleClose}>
                        닫기
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

const StyledButton = styled.button`
    padding: 6px 16px;
    border-radius: 8px;
    ${({ theme }) => theme.fonts.body3};
    cursor: pointer;
    transition: all 0.2s;
    min-width: 120px;
    border: 1px solid ${({ theme }) => theme.colors.gray03};
    background: ${({ theme }) => theme.colors.gray01};
    color: ${({ theme }) => theme.colors.gray05};
    
    &:hover {
        background: ${({ theme }) => theme.colors.gray02};
    }
`;

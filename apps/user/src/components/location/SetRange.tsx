import styled from "styled-components";
import { Button } from "@core/ui/button";

type SetRangeProps = {
  open: boolean;
  currentRange: number;
  onClose: () => void;
  onConfirm: (range: number) => void;
};

export default function SetRange({ open, currentRange, onClose, onConfirm }: SetRangeProps) {
  const [selectedRange, setSelectedRange] = useState(currentRange);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRange(Number(e.target.value));
  };

  const handleConfirm = () => {
    onConfirm(selectedRange);
    onClose();
  };

  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <SheetWrapper onClick={(e) => e.stopPropagation()}>
        <Handle />
        
        <Content>
          <Title>동네 범위</Title>
          <Description>가까운 주변 반경을 설정하세요</Description>
          
          <RangeContainer>
            <RangeLabels>
              <Label>{selectedRange}km</Label>
            </RangeLabels>
            
            <SliderWrapper>
              <RangeInput
                type="range"
                min="3"
                max="7"
                step="1"
                value={selectedRange}
                onChange={handleRangeChange}
              />
              <SliderTrack>
                <SliderFill $percentage={((selectedRange - 3) / 4) * 100} />
              </SliderTrack>
            </SliderWrapper>
            
            <MinMaxLabels>
              <span>3km</span>
              <span>7km</span>
            </MinMaxLabels>
          </RangeContainer>
          
          <Button 
            tone="blue" 
            radius="pill" 
            size="lg" 
            fullWidth 
            onClick={handleConfirm}
          >
            설정 완료
          </Button>
        </Content>
      </SheetWrapper>
    </Overlay>
  );
}

import { useState } from "react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const SheetWrapper = styled.div`
  background: ${({ theme }) => theme.colors.gray01};
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  background: ${({ theme }) => theme.colors.gray03};
  border-radius: 2px;
  margin: 0 auto 1.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h3`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray07};
  text-align: center;
  margin: 0;
`;

const Description = styled.p`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray05};
  text-align: center;
  margin: 0;
`;

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const Label = styled.div`
  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.blue01};
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const SliderTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.gray03};
  border-radius: 2px;
  pointer-events: none;
`;

const SliderFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ theme }) => theme.colors.blue01};
  border-radius: 2px;
  transition: width 0.1s ease;
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: transparent;
  outline: none;
  position: relative;
  z-index: 1;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.blue01};
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.blue01};
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const MinMaxLabels = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray05};
  padding: 0 0.5rem;
`;

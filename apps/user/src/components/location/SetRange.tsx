import styled from "styled-components";
import { Button } from "@core/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateSearchRadius } from "@apis/location/radius";

type SetRangeProps = {
  currentRange: number;
  onConfirm: (range: number) => void;
};

export default function SetRange({ currentRange, onConfirm }: SetRangeProps) {
  const [selectedRange, setSelectedRange] = useState(currentRange);
  const navigate = useNavigate();

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRange = Number(e.target.value);
    setSelectedRange(newRange);
    onConfirm(newRange); // 슬라이더 변경 시 즉시 반영
  };

  const handleConfirm = async () => {
    const success = await updateSearchRadius(selectedRange);
    if (success) {
      console.log("반경 설정이 저장되었습니다.");
      onConfirm(selectedRange);
      navigate("/");
    } else {
      console.error("반경 설정 저장에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>동네 범위</Title>
      <Description>가까운 주변 반경을 설정하세요</Description>
      
      <RangeContainer>
        
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
          <StepDots>
            {[3, 4, 5, 6, 7].map((value) => (
              <StepDot key={value} $isActive={value <= selectedRange} />
            ))}
          </StepDots>
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
    </Container>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.gray01};
  border-radius: 20px 20px 0 0;
  padding: 1rem 1.36rem;
  display: flex;
  flex-direction: column;
  height: 16rem;
`;

const Title = styled.h3`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray07};
  text-align: center;
  margin: 0;
`;

const Description = styled.p`
  ${({ theme }) => theme.fonts.label2};
  color: ${({ theme }) => theme.colors.gray05};
  text-align: center;
  margin: 0;
`;

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 1rem 0 1.2rem 0;
`;


const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 9.5px;
`;

const SliderTrack = styled.div`
  position: absolute;
  left: 9.5px;
  right: 9.5px;
  height: 3px;
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

const StepDots = styled.div`
  position: absolute;
  left: 9.5px;
  right: 9.5px;
  display: flex;
  justify-content: space-between;
`;

const StepDot = styled.div<{ $isActive: boolean }>`
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: ${({ $isActive, theme }) => $isActive ? theme.colors.blue01 : theme.colors.gray03};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 3px;
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

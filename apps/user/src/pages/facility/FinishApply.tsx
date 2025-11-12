import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@core/ui/button";

export default function FinishApply() {
  const location = useLocation();
  const navigate = useNavigate();
  const { facilityId } = useParams<{ facilityId?: string }>();

  // facilityId가 URL에 있으면 시설상담, 없으면 프로그램
  const isProgram = !facilityId;

  const consultType = location.state?.consultType as
    | "facility"
    | "general"
    | undefined;
  const facilityName = location.state?.facilityName;

  const handleClose = () => {
    navigate("/");
  };

  const handleViewConsults = () => {
    navigate("/mypage/consults");
  };

  return (
    <Wrapper>
      <Title>
        <img
          src="/img/apply/check.png"
          style={{ width: "81px", height: "81px" }}
        />
        <h1>
          {isProgram ? "프로그램 신청이" : "상담신청이"} <br /> 완료되었습니다.
        </h1>
        <SubTitle>
          {isProgram ? (
            <>
              신청 목록은 <strong>[신청 내역]</strong> → <br />
              <strong>[프로그램 신청]</strong>에서 확인하세요.
            </>
          ) : (
            facilityName && (
              <>
                {facilityName}{" "}
                {consultType === "facility" ? "시설상담" : "일반상담"}
              </>
            )
          )}
        </SubTitle>
      </Title>

      {!isProgram && (
        <Container>
          <ProcessList>
            <ProcessItem>
              <StepNumber>1</StepNumber>
              <Info>
                <StepText>상담 신청 접수</StepText>
                <Caption>담당자가 신청 내역을 확인합니다.</Caption>
              </Info>
            </ProcessItem>
            <ProcessItem>
              <StepNumber>2</StepNumber>
              <Info>
                <StepText>담당자 연락</StepText>
                <Caption>1-2일 내로 등록하신 연락처로 연락드립니다.</Caption>
              </Info>
            </ProcessItem>
            <ProcessItem>
              <StepNumber>3</StepNumber>
              <Info>
                <StepText>상담 일정 조정</StepText>
                <Caption>담당자와 상담 일정을 조율합니다.</Caption>
              </Info>
            </ProcessItem>
          </ProcessList>
        </Container>
      )}

      {isProgram ? (
        <ButtonWrapper>
          <Button
            tone="blue"
            radius="pill"
            size="lg"
            onClick={handleClose}
            fullWidth
          >
            확인
          </Button>
        </ButtonWrapper>
      ) : (
        <ButtonContainer>
          <CloseButton onClick={handleClose}>닫기</CloseButton>
          <ViewButton onClick={handleViewConsults}>상담 내역 보기</ViewButton>
        </ButtonContainer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 3rem 1.5rem 2rem;
  background: ${({ theme }) => theme.colors.gray01};
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  text-align: center;
  margin-top: 8rem;

  h1 {
    ${({ theme }) => theme.fonts.heading1};
    color: ${({ theme }) => theme.colors.gray07};
    margin: 0;
    line-height: 1.4;
  }
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.fonts.label1};
  color: ${({ theme }) => theme.colors.gray05};
  margin: 0;
`;

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.blue03};
  border-radius: 10px;
  padding: 2rem 1.5rem;
  border: 1.5px solid ${({ theme }) => theme.colors.blue02};
`;

const ProcessList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProcessItem = styled.div`
  display: flex;
  align-items: start;
  gap: 0.8rem;
`;

const StepNumber = styled.div`
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blue01};
  color: ${({ theme }) => theme.colors.gray01};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px 0 0 4px;
  ${({ theme }) => theme.fonts.caption};
`;

const Info = styled.span`
  display: flex;
  flex-direction: column;
`;

const StepText = styled.span`
  ${({ theme }) => theme.fonts.label1};
  color: ${({ theme }) => theme.colors.gray07};
`;

const Caption = styled.span`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray05};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  margin-top: 2rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const CloseButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.colors.blue01};
  background: ${({ theme }) => theme.colors.gray01};
  color: ${({ theme }) => theme.colors.blue01};
  ${({ theme }) => theme.fonts.title2};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.blue03};
  }
`;

const ViewButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 50px;
  border: none;
  background: ${({ theme }) => theme.colors.blue01};
  color: white;
  ${({ theme }) => theme.fonts.title2};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.blue02};
  }
`;

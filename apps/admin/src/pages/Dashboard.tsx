import styled from "styled-components";
import ToggleButtonGroup from "@core/components/ToggleButtonGroup";
import { Button } from "@core/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [hopeTime, setHopeTime] = useState("오전");
  const [paymentMethod, setPaymentMethod] = useState("오전");
  const navigate = useNavigate();

  return (
    <Overlay>
    <Wrapper>
      <Header>
        <Head>
          프리미엄 플랜 구독
          <img src="/img/dashboard/close.svg" onClick={() => navigate("/")}/>
        </Head>
        더 많은 기능으로 시설을 효율적으로 관리하세요
      </Header>
      <ContentWrapper>
        <Section>
          <Title>결제 주기 선택</Title>
          <ToggleButtonGroup
              label=""
              options={[
                  { value: "오전", label: "premium" },
                  { value: "오후", label: "Enterprise (협약형)" }
              ]}
              value={hopeTime}
              onChange={setHopeTime}
              helperText=" "
          />
        </Section>
        <Section>
          <Title>프리미엄 기능</Title>
          <PremiumContainer>
            <PremiumItem>
            <img src="/img/dashboard/unlimit.svg" />
            무제한 프로그램 등록
            </PremiumItem>
            <PremiumItem>
              <img src="/img/dashboard/statics.svg" />
              프로그램 통계 분석
              </PremiumItem>
            <PremiumItem>
              <img src="/img/dashboard/promotion.svg" />
              시설 홍보 상단유지
            </PremiumItem>
            <PremiumItem>
              <img src="/img/dashboard/member.svg" />
              회원 관리
            </PremiumItem>
            <PremiumItem>
              <img src="/img/dashboard/report.svg" />
              맞춤형 리포트 제공
            </PremiumItem>
          </PremiumContainer>
        </Section>
        <Section>
          <Title>결제 수단</Title>
          <ToggleButtonGroup
            label=""
            options={[
                { value: "오전", label: "신용카드" },
                { value: "오후", label: "계좌이체" }
            ]}
            value={paymentMethod}
            onChange={setPaymentMethod}
            helperText=" "
          />
        </Section>
        <TotalPrice>
          <TotalHeader>
            결제 주기
            <p>월간</p>
          </TotalHeader>
          <TotalMoney>
            총 결제 금액
            <p>₩29,000</p>
          </TotalMoney>
        </TotalPrice>
        <Button
          tone="blue"
          size="lg"
        >
          결제하기
        </Button>
      </ContentWrapper>
    </Wrapper>
    </Overlay>
  );
};

export default Dashboard;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.gray01};
    border-radius: 20px;
    width: 40rem;
    overflow: hidden;
`;

const Header = styled.div`
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.colors.blue01};;
  color: white;
  padding: 1rem;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.fonts.heading2};
  margin-bottom: 0.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.gray07};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.heading3};
  margin: 0;
`;

const PremiumContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.gray02};
  border-radius: 12px;
  padding: 1rem;
`;

const PremiumItem = styled.div`
  ${({ theme }) => theme.fonts.body3};
  display: flex;
  gap: 1rem;
`;

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.gray02};
  border-radius: 8px;
`;

const TotalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.body1};
  
  p {
    ${({ theme }) => theme.fonts.body1};
    margin: 0;
  }
`;

const TotalMoney = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.heading2};
  
  p {
    ${({ theme }) => theme.fonts.heading2};
    color: ${({ theme }) => theme.colors.blue01};
    margin: 0;
  }
`;
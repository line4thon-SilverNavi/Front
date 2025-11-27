import styled from "styled-components";
import { Button } from "@core/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanToggleGroup from "@components/dashboard/PlanToggleGroup";

const PLAN_OPTIONS = [
  {
    value: "premium",
    name: "Premium",
    price: "₩29,000",
    per: "월",
    tagLabel: "추천",
  },
  {
    value: "enterprise",
    name: "Enterprise (협약형)",
    price: "₩200,000",
    per: "월",
  },
];

const PREMIUM_ITEMS = [
  { icon: "/img/dashboard/unlimit.svg", label: "무제한 프로그램 등록" },
  { icon: "/img/dashboard/statics.svg", label: "프로그램 통계 분석" },
  { icon: "/img/dashboard/promotion.svg", label: "시설 홍보 상단유지" },
  { icon: "/img/dashboard/member.svg", label: "회원 관리" },
  { icon: "/img/dashboard/report.svg", label: "맞춤형 리포트 제공" },
];

const Dashboard = () => {
  const [plan, setPlan] = useState("premium");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  const selectedPlan = PLAN_OPTIONS.find((p) => p.value === plan);
  const totalPrice = selectedPlan?.price ?? "₩0";

  return (
    <Overlay>
      <Wrapper>
        <Header>
          <Head>
            프리미엄 플랜 구독
            <img src="/img/dashboard/close.svg" onClick={() => navigate("/")} />
          </Head>
          더 많은 기능으로 시설을 효율적으로 관리하세요
        </Header>
        <ContentWrapper>
          <Section>
            <Title>결제 주기 선택</Title>
            <PlanToggleGroup
              value={plan}
              onChange={setPlan}
              options={PLAN_OPTIONS}
            />
          </Section>
          <Section>
            <Title>프리미엄 기능</Title>
            <PremiumContainer>
              {PREMIUM_ITEMS.map((item) => (
                <PremiumItem key={item.label}>
                  <img src={item.icon} />
                  {item.label}
                </PremiumItem>
              ))}
            </PremiumContainer>
          </Section>
          <Section>
            <Title>결제 수단</Title>
            <PlanToggleGroup
              value={paymentMethod}
              onChange={setPaymentMethod}
              options={[
                {
                  value: "card",
                  name: "신용카드",
                  iconSrc: "/img/dashboard/card.svg",
                },
                {
                  value: "account",
                  name: "계좌이체",
                  iconSrc: "/img/dashboard/account.svg",
                },
              ]}
            />
          </Section>
          <TotalPrice>
            <TotalHeader>
              결제 주기
              <p>월간</p>
            </TotalHeader>
            <TotalMoney>
              총 결제 금액
              <p>{totalPrice}</p>
            </TotalMoney>
          </TotalPrice>
          <Bottom>
            <Button tone="blue" size="lg" radius="16px">
              프리미엄으로 업그레이드
            </Button>
            <p className="sub">
              결제 후 즉시 프리미엄 기능을 이용하실 수 있습니다.
            </p>
          </Bottom>
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
  overflow: scroll;
  height: 90%;
`;

const Header = styled.div`
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.colors.blue01};
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

  .sub {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray04};
  }
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
  padding: 1rem;
  background: ${({ theme }) => theme.colors.blue03};
  border-radius: 16px;
`;

const TotalHeader = styled.div`
  display: flex;
  padding-bottom: 1rem;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.label2};
  color: ${({ theme }) => theme.colors.gray06};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray03};

  p {
    color: ${({ theme }) => theme.colors.gray07};
    ${({ theme }) => theme.fonts.label1};
  }
`;

const TotalMoney = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.title1};
  align-items: center;

  p {
    ${({ theme }) => theme.fonts.heading2};
    color: ${({ theme }) => theme.colors.blue01};
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

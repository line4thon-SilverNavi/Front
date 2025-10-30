import { Button, ButtonLayout } from "@core/ui/button";
import OrDivider from "@core/ui/OrDivider";
import * as s from "./Intro_styled";

const Intro = () => {
  return (
    <s.IntroWrapper>
      <s.IntroTitleContainer>
        <p>당신의 하루가 더 활짝 피어나도록</p>
        <img src="/img/auth/logo.png" />
      </s.IntroTitleContainer>
      <s.IntroBtnContainer>
        <Button tone="blue" radius="5px" typo="body3">
          기존 계정으로 로그인
        </Button>
        <OrDivider>또는</OrDivider>
        <ButtonLayout type="stack" gap={12}>
          <Button tone="blue" variant="outline" radius="5px" typo="body3">
            데모 계정으로 시작
          </Button>
          <Button tone="gray" variant="solid" radius="5px" typo="body3">
            회원가입
          </Button>
        </ButtonLayout>
      </s.IntroBtnContainer>
    </s.IntroWrapper>
  );
};

export default Intro;

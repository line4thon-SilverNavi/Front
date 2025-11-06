import AuthLayout from "@layouts/AuthLayout";
import { Button, ButtonLayout } from "@core/ui/button";
import InputContainer from "@core/components/inputContainer";
import * as s from "./Auth.styled";
import { useState } from "react";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, _] = useState<string | null>(null);

  return (
    <AuthLayout
      title={
        <s.AuthTitle>
          <img src="/img/auth/adminLogo.png" />
          <p>당신의 하루가 조금 더 활짝 피어나도록, 실버나비와 함께.</p>
        </s.AuthTitle>
      }
    >
      <s.LoginContent>
        <InputContainer
          label="아이디"
          value={id}
          onChange={setId}
          placeholder="아이디를 입력해주세요."
          autoComplete="id"
          type="text"
          helperText=" "
          labelTypo="heading2"
          inputTypo="heading1"
        />
        <InputContainer
          label="비밀번호"
          value={pw}
          onChange={setPw}
          placeholder="비밀번호"
          type="password"
          autoComplete="current-password"
          showToggleForPassword
          errorText={error ?? undefined}
          labelTypo="heading2"
          inputTypo="heading1"
        />
      </s.LoginContent>

      <ButtonLayout type="stack" gap={16}>
        <Button tone="blue" radius="9.6px" typo="heading2" size="adminAuth">
          로그인
        </Button>
        <Button
          tone="blue"
          variant="outline"
          radius="9.6px"
          typo="heading2"
          size="adminAuth"
        >
          데모 계정으로 시작
        </Button>
        <Button
          tone="gray"
          variant="solid"
          radius="9.6px"
          typo="heading2"
          size="adminAuth"
        >
          회원가입
        </Button>
      </ButtonLayout>
    </AuthLayout>
  );
};

export default Login;

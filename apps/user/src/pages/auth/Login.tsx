import { useState } from "react";
import { Button } from "@core/ui/button";
import { postLogin } from "@apis/auth/login";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@layouts/DefaultLayout";
import InputContainer from "@core/components/inputContainer";
import { setTokens } from "@core/api/auth";
import styled from "styled-components";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setError(null);
    const res = await postLogin({ id, password: pw });

    if (!res?.isSuccess) {
      return setError(res?.message || "로그인에 실패했습니다.");
    }

    setTokens({ 
      access: res.data.token, 
      refresh: "",
      careGrade: res.data.careGrade 
    });
    navigate("/");
  };

  return (
    <DefaultLayout
      header={
        <Header>
          <img src="/img/auth/back.png" onClick={() => navigate(-1)} />
          <Title>로그인</Title>
        </Header>
      }
      footer={
        <Button tone="blue" radius="pill" size="lg" onClick={onSubmit}>
          로그인
        </Button>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <InputContainer
          label="휴대폰 번호"
          value={id}
          onChange={(v) => setId(v.replace(/[^0-9]/g, ""))}
          placeholder="휴대폰 번호를 입력해주세요.(- 빼고 입력)"
          autoComplete="username"
          type="number"
          helperText=" "
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
        />
      </div>
    </DefaultLayout>
  );
}

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading1};
  color: ${({ theme }) => theme.colors.gray07};
  margin: 1rem 0 0 0;
`;

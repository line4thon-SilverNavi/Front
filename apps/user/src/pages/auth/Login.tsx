import { useState } from "react";

import { Button } from "@core/ui/button";
import { postLogin } from "@apis/auth/login";
import { useNavigate } from "react-router-dom";
import { setTokens } from "@apis/auth/auth";
import AuthLayout from "@components/auth/authLayout";
import InputContainer from "@components/auth/inputContainer";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setError(null);
    const res = await postLogin({ id, password: pw });
    if (!res) return setError("로그인에 실패했습니다.");
    setTokens({ access: res.token, refresh: "" });
    navigate("/");
  };

  return (
    <AuthLayout
      title="로그인"
      footer={
        <Button tone="blue" radius="pill" size="lg" onClick={onSubmit}>
          로그인
        </Button>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <InputContainer
          label="아이디"
          value={id}
          onChange={setId}
          placeholder="아이디"
          autoComplete="username"
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
    </AuthLayout>
  );
}

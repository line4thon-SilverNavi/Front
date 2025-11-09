import AuthLayout from "@layouts/AuthLayout";
import * as s from "./Auth.styled";
import InputContainer from "@core/components/inputContainer";
import { useState } from "react";
import { Button } from "@core/ui/button";
import { postSignup } from "@apis/auth/signup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [code, setCode] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);

    const res = await postSignup({
      name: facilityName,
      affiliateCode: code,
      loginId: id,
      password: pw,
      passwordCheck: pwCheck,
    });

    if (!res.isSuccess) {
      return setError(res.message || "회원가입에 실패했습니다.");
    }

    navigate("/login");
  };

  const onBack = () => navigate(-1);

  return (
    <AuthLayout
      title={
        <s.TitleContainer>
          <img src="/img/auth/back.png" onClick={onBack} />
          <p>회원가입</p>
        </s.TitleContainer>
      }
    >
      <s.LoginContent>
        <InputContainer
          label="시설명"
          value={facilityName}
          onChange={setFacilityName}
          placeholder="시설명을 입력하세요"
          autoComplete="facilityName"
          type="text"
          labelTypo="heading2"
          inputTypo="heading1"
        />
        <InputContainer
          label="제휴코드"
          value={code}
          onChange={setCode}
          placeholder="제휴코드를 입력하세요"
          autoComplete="code"
          type="text"
          labelTypo="heading2"
          inputTypo="heading1"
        />
        <InputContainer
          label="아이디"
          value={id}
          onChange={setId}
          placeholder="아이디를 입력하세요"
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
          placeholder="영문, 숫자, 특수문자 조합 6자 이상"
          type="password"
          autoComplete="new-password"
          showToggleForPassword
          labelTypo="heading2"
          inputTypo="heading1"
          errorText={error ?? undefined}
          width="38.4px"
          height="38.4px"
        />
        <InputContainer
          label="비밀번호 확인"
          onChange={setPwCheck}
          placeholder="영문, 숫자, 특수문자 조합 6자 이상"
          type="password"
          autoComplete="new-password"
          showToggleForPassword
          labelTypo="heading2"
          value={pwCheck}
          inputTypo="heading1"
          errorText={error ?? undefined}
          width="38.4px"
          height="38.4px"
        />
      </s.LoginContent>
      <Button
        tone="blue"
        radius="9.6px"
        size="adminAuth"
        typo="heading2"
        onClick={onSubmit}
      >
        회원가입
      </Button>
    </AuthLayout>
  );
};

export default Signup;

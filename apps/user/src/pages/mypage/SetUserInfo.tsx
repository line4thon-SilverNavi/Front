import DefaultLayout from "@layouts/DefaultLayout";
import CommonHeader from "@components/common/CommonHeader";
import { Button } from "@core/ui/button";
import styled from "styled-components";
import InputContainer from "@core/components/inputContainer";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RelationSelectModal from "@components/auth/RelationSelectModal";
import {
  relationLabel,
  relationToApi,
  type RelationCode,
} from "@constants/relation";
import BirthContainer from "@components/mypage/BirthContainer";
import ToggleButtonGroup from "@core/components/ToggleButtonGroup";
import TermsModal from "@components/mypage/TermsModal";
import { getUserDetail } from "@apis/mypage/userDetail";
import { updateUserInfo } from "@apis/mypage/updateUserInfo";

export default function SetUserInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  //  입력폼 필드
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState<RelationCode | "">("");
  const [birth, setBirth] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");

  // 초기값 저장 (변경 감지용)
  const [initialData, setInitialData] = useState({
    name: "",
    phone: "",
    relation: "" as RelationCode | "",
    birth: "",
    grade: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
  });

  const [open, setOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // 페이지 진입 시 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const data = await getUserDetail();
        if (data) {
          const careTargetName = data.careTargetName || "";
          const careTargetPhone = data.careTargetPhone || "";
          const relationRole = (data.relationRole as RelationCode) || "";
          const careTargetBirth = data.careTargetBirth || "";
          const careGrade = data.careGrade || "";
          const careTargetGender = data.careTargetGender || "";
          const guardianNameValue = data.guardianName || "";
          const guardianPhoneValue = data.guardianPhone || "";

          setGuardianName(guardianNameValue);
          setGuardianPhone(guardianPhoneValue);
          setName(careTargetName);
          setBirth(careTargetBirth);
          setGender(careTargetGender);
          setRelation(relationRole);
          setPhone(careTargetPhone);
          setGrade(careGrade);

          // 초기값 저장
          setInitialData({
            name: careTargetName,
            phone: careTargetPhone,
            relation: relationRole,
            birth: careTargetBirth,
            grade: careGrade,
            gender: careTargetGender,
            guardianName: guardianNameValue,
            guardianPhone: guardianPhoneValue,
          });
        }
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다:", error);
      }
    };

    fetchUserDetail();
  }, []);

  // Certify 페이지에서 돌아올 때 careGrade 받기
  useEffect(() => {
    if (location.state?.careGrade) {
      setGrade(location.state.careGrade);
      // state 정리 (뒤로가기 시 중복 적용 방지)
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmitClick = async () => {
    try {
      // 변경된 필드만 추출
      const updates: any = {};

      if (name !== initialData.name) {
        updates.careTargetName = name || undefined;
      }
      if (relation !== initialData.relation) {
        updates.relationRole = relationToApi(relation || undefined);
      }
      if (phone !== initialData.phone) {
        updates.careTargetPhone = phone || undefined;
      }
      if (birth !== initialData.birth) {
        updates.careTargetBirth = birth || undefined;
      }
      if (grade !== initialData.grade) {
        updates.careGrade = (grade as any) || undefined;
      }
      if (gender !== initialData.gender) {
        updates.careTargetGender = (gender as any) || undefined;
      }
      if (guardianName !== initialData.guardianName) {
        updates.guardianName = guardianName || undefined;
      }
      if (guardianPhone !== initialData.guardianPhone) {
        updates.guardianPhone = guardianPhone || undefined;
      }

      // 변경된 것이 없으면 요청하지 않음
      if (Object.keys(updates).length === 0) {
        alert("변경된 내용이 없습니다.");
        return;
      }

      const response = await updateUserInfo(updates);

      if (response?.isSuccess) {
        alert("정보가 성공적으로 저장되었습니다.");
        // 초기값 업데이트
        setInitialData({
          name,
          phone,
          relation,
          birth,
          grade,
          gender,
          guardianName,
          guardianPhone,
        });
      } else {
        alert(response?.message || "저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleCertiftClick = async () => {
    setTermsOpen(true);
  };

  const handleTermsConfirm = () => {
    setTermsOpen(false);
    // 약관 확인 후 Certify 페이지로 이동
    navigate("/mypage/certify");
  };

  return (
    <DefaultLayout
      header={<CommonHeader title="개인 정보 설정" />}
      footer={
        <Button tone="blue" radius="pill" size="lg" onClick={handleSubmitClick}>
          저장
        </Button>
      }
    >
      <Title>
        돌봄 대상자 정보
        <CameraButton onClick={handleCertiftClick}>
          <img src="/img/apply/camera.png" alt="camera" />
          <span>인정서 촬영</span>
        </CameraButton>
      </Title>

      <Container>
        <InputContainer
          label="돌봄 대상자 이름"
          value={name}
          onChange={setName}
          placeholder="케어가 필요한 분의 이름을 입력해주세요"
          helperText=" "
        />
        <InputContainer
          label="돌봄 대상자와의 관계"
          value={relationLabel(relation || undefined)}
          onChange={() => {}}
          placeholder="클릭하여 선택하기"
          helperText=" "
          clickable
          onClickInput={() => setOpen(true)}
        />

        <RelationSelectModal
          open={open}
          value={relation || undefined}
          onClose={() => setOpen(false)}
          onSelect={(code) => {
            setRelation(code);
            setOpen(false);
          }}
        />
        <InputContainer
          label="휴대폰번호"
          value={phone}
          onChange={setPhone}
          placeholder="케어가 필요한 분의 번호를 입력해주세요"
          helperText="'-'없이 입력하세요"
        />

        <BirthContainer value={birth} onChange={setBirth} />

        <InputContainer
          label="돌봄 대상자 요양등급"
          value={grade}
          onChange={() => {}}
          placeholder={grade ? grade : "인증서를 촬영해주세요"}
          helperText=""
          clickable
          onClickInput={handleCertiftClick}
        />

        <ToggleButtonGroup
          label="돌봄 대상자 성별"
          options={[
            { value: "male", label: "남성" },
            { value: "female", label: "여성" },
          ]}
          value={gender}
          onChange={setGender}
          helperText=" "
        />

        <InputContainer
          label="보호자 성함"
          value={guardianName}
          onChange={setGuardianName}
          placeholder="보호자의 성함을 입력해주세요"
          helperText=" "
        />

        <InputContainer
          label="보호자 연락처"
          value={guardianPhone}
          onChange={setGuardianPhone}
          placeholder="보호자의 휴대전화 번호를 입력해주세요"
          helperText="'-'없이 입력하세요 "
        />
      </Container>

      <TermsModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        onConfirm={handleTermsConfirm}
      />
    </DefaultLayout>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.2rem;
  align-items: center;
  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.gray07};
  margin: 1rem 0 0 0;
  margin-bottom: 26px;
  white-space: nowrap;
  @media (max-width: 350px) {
    ${({ theme }) => theme.fonts.heading3};
  }
`;

const CameraButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1.4rem;
  border-radius: 20px;
  border: none;
  background: ${({ theme }) => theme.colors.blue01};
  color: white;
  ${({ theme }) => theme.fonts.body1};
  cursor: pointer;
  white-space: nowrap;

  img {
    width: 17px;
    height: 15px;
  }

  &:active {
    opacity: 0.8;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import DefaultLayout from "@layouts/DefaultLayout";
import CommonHeader from "@components/common/CommonHeader";
import { Button } from "@core/ui/button";
import styled from "styled-components";
import InputContainer from "@core/components/inputContainer";
import TextAreaContainer from "@core/components/TextAreaContainer";
import ToggleButtonGroup from "@core/components/ToggleButtonGroup";
import { getUserDetail } from "@apis/mypage/userDetail";
import CompleteProfile from "@components/program/CompleteProfile";
import RelationSelectModal from "@components/auth/RelationSelectModal";
import { relationLabel, type RelationCode } from "@constants/relation";
import BirthContainer from "@components/mypage/BirthContainer";
import TermsModal from "@components/mypage/TermsModal";
import { postProgramApply } from "@apis/program/programApply";

export default function ProgramApply() {
  const navigate = useNavigate();
  const location = useLocation();
  const { programId } = useParams<{ programId: string }>();

  // 모달 상태
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const [open, setOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // 폼 상태
  const [name, setName] = useState("");
  const [relation, setRelation] = useState<RelationCode | null>(null);
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [content, setContent] = useState("");

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const userDetail = await getUserDetail();

        if (!userDetail) {
          setShowProfileModal(true);
          setIsProfileComplete(false);
          return;
        }

        // null 값이 있는지 확인
        const hasNullValue =
          !userDetail.careTargetName ||
          !userDetail.careTargetBirth ||
          !userDetail.careTargetGender ||
          !userDetail.relationRole ||
          !userDetail.careTargetPhone ||
          !userDetail.careGrade;

        if (hasNullValue) {
          // null 값이 있으면 모달 표시
          setShowProfileModal(true);
          setIsProfileComplete(false);
        } else {
          // 모든 값이 있으면 폼에 채우기
          setIsProfileComplete(true);
          setName(userDetail.careTargetName || "");
          setRelation((userDetail.relationRole as RelationCode) || null);
          setPhone(userDetail.careTargetPhone || "");
          setBirth(userDetail.careTargetBirth || "");
          setGrade(userDetail.careGrade || "");
          setGender(userDetail.careTargetGender || "");
          setGuardianName(userDetail.guardianName || "");
          setGuardianPhone(userDetail.guardianPhone || "");
        }
      } catch (error) {
        console.error("유저 정보를 불러오는데 실패했습니다:", error);
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

  const handleProfileComplete = () => {
    // 프로필 수정 페이지로 이동
    navigate("/setuser");
  };

  const handleCertiftClick = () => {
    // 약관 모달을 띄우고 확인 후 인증서 페이지로 이동
    setTermsOpen(true);
  };

  const handleTermsConfirm = () => {
    setTermsOpen(false);
    // 약관 확인 후 Certify 페이지로 이동
    navigate("/certify");
  };

  const handleSubmitClick = async () => {
    if (!isProfileComplete) {
      setShowProfileModal(true);
      return;
    }

    if (!programId) {
      alert("프로그램 ID가 없습니다.");
      return;
    }

    try {
      const response = await postProgramApply(Number(programId), {
        content: content,
      });

      if (response?.isSuccess) {
        navigate("/finishapply");
      } else {
        alert(response?.message || "신청에 실패했습니다.");
      }
    } catch (error) {
      console.error("신청 실패:", error);
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <CompleteProfile
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onConfirm={handleProfileComplete}
      />

      <DefaultLayout
        header={<CommonHeader title="참여 신청" />}
        footer={
          <Button
            tone="blue"
            radius="pill"
            size="lg"
            onClick={handleSubmitClick}
            //disabled={!isProfileComplete}
          >
            참여 신청
          </Button>
        }
      >
        <Container>
          <Title>
            프로필 정보 확인
            <p onClick={() => navigate("/setuser")}>정보 수정</p>
          </Title>
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
            placeholder="케어가 필요한 분의 휴대전화 번호를 입력해주세요"
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

          <TextAreaContainer
            label="문의 내용 (선택)"
            value={content}
            onChange={setContent}
            placeholder="문의하실 내용을 자유롭게 작성해주세요."
            helperText=" "
          />
        </Container>
      </DefaultLayout>

      <TermsModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        onConfirm={handleTermsConfirm}
      />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.2rem;
  align-items: center;
  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.gray07};
  margin: 1rem 0 0 0;
  white-space: nowrap;
  p {
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.blue01};
    cursor: pointer;
  }
`;

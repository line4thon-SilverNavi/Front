import { useLocation, useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "@layouts/DefaultLayout";
import { Button } from "@core/ui/button";
import { postFacilityApply, postGeneralApply } from "@apis/facility/facilityApply";
import styled from "styled-components";
import InputContainer from "@core/components/inputContainer";
import TextAreaContainer from "@core/components/TextAreaContainer";
import ToggleButtonGroup from "@core/components/ToggleButtonGroup";
import { useState, useEffect } from "react";
import { getUserDetail } from "@apis/mypage/userDetail";
import { inquaryTypeLabel, type inquaryTypeCode } from "@constants/inquaryType";
import InquiryTypeSelectModal from "@components/facility/InquiryTypeSelectModal";
import CheckApply from "@components/facility/CheckApply";
import { getUserConsults } from "@apis/mypage/userConsults";

export default function FacilityApplyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { facilityId } = useParams<{ facilityId: string }>();
    
    const consultType = location.state?.consultType as 'facility' | 'general' | undefined;
    const facilityName = location.state?.facilityName;

    // 시설 상담 폼 필드
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [relationRole, setRelationRole] = useState("");
    const [hopeDate, setHopeDate] = useState("");
    const [hopeTime, setHopeTime] = useState("");
    const [facilityConsultType, setFacilityConsultType] = useState("");
    const [content, setContent] = useState("");

    // 일반 상담 폼 필드
    const [inquiryType, setInquiryType] = useState<inquaryTypeCode | "">("");
    const [open, setOpen] = useState(false);
    
    // 신청 확인 모달
    const [checkModalOpen, setCheckModalOpen] = useState(false);
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

    // 사용자 정보 불러오기
    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const userDetail = await getUserDetail();
                if (userDetail) {
                    setRelationRole(userDetail.relationRole || "");
                    
                    // 돌봄대상자 이름 설정
                    if (userDetail.careTargetName) {
                        setName(userDetail.careTargetName);
                    }
                    
                    // 연락처 설정 (guardianPhone 우선, 없으면 careTargetPhone)
                    if (userDetail.guardianPhone) {
                        setPhone(userDetail.guardianPhone);
                    } else if (userDetail.careTargetPhone) {
                        setPhone(userDetail.careTargetPhone);
                    }
                }
            } catch (error) {
                console.log("사용자 정보를 불러올 수 없습니다. 기본값을 사용합니다.");
                // 에러가 나도 계속 진행
            }
        };
        fetchUserDetail();
    }, []);

    // 중복 신청 체크
    const checkDuplicateApplication = async () => {
        try {
            const consults = await getUserConsults();
            if (!consults || !facilityId) return false;
            
            // 해당 시설에 대한 신청이 있는지 확인
            const alreadyApplied = consults.consults.some(
                (consult) => consult.id === Number(facilityId)
            );
            
            return alreadyApplied;
        } catch (error) {
            console.log("상담 내역을 불러올 수 없습니다. 중복 체크를 건너뜁니다.");
            return false; // 에러가 나면 중복 아님으로 처리
        }
    };

    // 신청 버튼 클릭 핸들러
    const handleSubmitClick = async () => {
        const isDuplicate = await checkDuplicateApplication();
        setIsAlreadyApplied(isDuplicate);
        setCheckModalOpen(true);
    };

    // 실제 신청 처리
    const onSubmit = async () => {
        const response = consultType === 'facility' 
            ? await postFacilityApply({
                facilityId: String(facilityId),
                name,
                phone,
                relationRole,
                hopeDate: hopeDate, // 문자열 그대로 전달
                hopeTime,
                consultType: facilityConsultType,
                content
            })
            : await postGeneralApply({
                facilityId: String(facilityId || ""),
                name,
                phone,
                inquiryType,
                content
            });

        if (!response?.isSuccess) {
            console.error("상담 신청 실패:", response?.message);
            return;
        }

        console.log("상담 신청 성공:", response.message);
        setCheckModalOpen(false);
        
        // 성공 페이지로 이동
        navigate(`/facility/${facilityId}/finish-apply`, {
            state: { consultType, facilityName }
        });
    };
        
    return (
        <DefaultLayout
            header={
                <Header>
                    <img src="/img/auth/back.png" onClick={() => navigate(-1)} />
                    <Title>{consultType === 'facility' ? '상담신청' : '일반상담신청'}</Title>
                </Header>
            }
            footer={
                <Button tone="blue" radius="pill" size="lg" onClick={handleSubmitClick}>
                    신청하기
                </Button>
            }
        >
            <Info>
                {consultType === 'facility' ? 
                facilityName : 
                <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                <img src="/img/detail-page/telephone-blue.png" style={{width:"20px", height:"20px"}}/> 일반 상담 안내
                </div>
                }

                <p>{consultType === 'facility' ? 
                '상담 신청서를 작성해주시면 담당자가 확인 후 연락드립니다.' : 
                <div style={{marginLeft:"28px"}}>상담 신청이 가능합니다. <br/> 담당자가 1~2일 내로 연락드릴 예정입니다.</div>}
                </p>
            </Info>
            
            {consultType === 'facility' && (
                <Container>
                    <InputContainer
                        label="돌봄대상자 이름"
                        value={name}
                        onChange={setName}
                        placeholder="돌봄대상자의 이름을 입력해주세요"
                        helperText=" "
                    />
                    <InputContainer
                        label="상담 가능한 연락처"
                        value={phone}
                        onChange={setPhone}
                        placeholder="'-'없이 입력하세요 (예: 01088889999)"
                        helperText=" "
                    />
                    <InputContainer
                        label="희망 상담 날짜"
                        value={hopeDate}
                        onChange={setHopeDate}
                        type="date"
                        helperText="날짜를 선택하세요"
                    />
                    <ToggleButtonGroup
                        label="희망 시간대"
                        options={[
                            { value: "오전", label: "오전" },
                            { value: "오후", label: "오후" }
                        ]}
                        value={hopeTime}
                        onChange={setHopeTime}
                        helperText=" "
                    />
                    <ToggleButtonGroup
                        label="희망 상담 종류"
                        options={[
                            { value: "대면", label: "대면(직접 방문)" },
                            { value: "비대면", label: "비대면(전화 상담)" }
                        ]}
                        value={facilityConsultType}
                        onChange={setFacilityConsultType}
                        helperText=" "
                    />
                    <TextAreaContainer
                        label="문의 내용 (선택)"
                        value={content}
                        onChange={setContent}
                        placeholder="문의하실 내용을 자유롭게 작성해주세요."
                        helperText=" "
                    />
                </Container>
            )}

            {consultType === 'general' && (
                <Container>
                    <InputContainer
                        label="이름"
                        value={name}
                        onChange={setName}
                        placeholder="이름을 입력해주세요"
                        helperText=" "
                    />
                    <InputContainer
                        label="연락처"
                        value={phone}
                        onChange={setPhone}
                        placeholder="'-'없이 입력하세요 (예: 01088889999)"
                        helperText=" "
                    />
                    <InputContainer
                        label="문의 유형"
                        value={inquaryTypeLabel(inquiryType || undefined)}
                        onChange={() => {}}
                        placeholder="클릭하여 선택하기"
                        helperText=" "
                        clickable
                        onClickInput={() => setOpen(true)}
                    />
                    <TextAreaContainer
                        label="문의 내용 (선택)"
                        value={content}
                        onChange={setContent}
                        placeholder="문의하실 내용을 자유롭게 작성해주세요."
                        helperText=" "
                    />
                    
                    <InquiryTypeSelectModal
                        open={open}
                        value={inquiryType || undefined}
                        onClose={() => setOpen(false)}
                        onSelect={(code) => {
                            setInquiryType(code);
                            setOpen(false);
                        }}
                    />
                </Container>
            )}

            {/* 공통 폼 영역 */}
            <div>
                {/* 이름, 연락처 등 공통 입력 필드 */}
            </div>
            
            <CheckApply
                open={checkModalOpen}
                onClose={() => setCheckModalOpen(false)}
                onConfirm={onSubmit}
                isAlreadyApplied={isAlreadyApplied}
            />
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

const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem 1.1rem;
    border-radius: 10px;
    border: 1px solid #409EE3;
    background: #EEF8FF;
    gap: 0.3rem;
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.blue01};
    margin-bottom: 26px;
    p{
        color: #717182;
        ${({ theme }) => theme.fonts.body4};
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

<<<<<<< HEAD
import { useLocation } from "react-router-dom";
=======
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
>>>>>>> cd5df4f61c59e69314408247496fe1be141c4f0d

export default function FacilityApplyPage() {
    const location = useLocation();
    const facilityId = location.state?.facilityId;

    return (
<<<<<<< HEAD
        <div>
            <h1>시설 신청</h1>
            <p>시설 ID: {facilityId}</p>
            {/* 신청 폼 작성 후 POST 요청 시 facilityId 함께 전송 */}
        </div>
    );
}
=======
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
                facilityName={facilityName}
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
>>>>>>> cd5df4f61c59e69314408247496fe1be141c4f0d

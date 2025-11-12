import DefaultLayout from "@layouts/DefaultLayout";
import styled, { keyframes } from "styled-components";
import CommonHeader from "@components/common/CommonHeader";
import { Button } from "@core/ui/button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postOcr } from "@apis/mypage/ocr";

export default function Certify(){
    const navigate = useNavigate();
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    // 1. 로딩 상태 및 파일 선택 상태 관리
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // 2. 파일 변경 및 OCR 처리 핸들러
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setIsLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await postOcr(formData);
            
            if (response?.isSuccess) {
                const careGrade = response.data.careGrade;

                navigate("/mypage/set-user-info", { 
                    state: { careGrade },
                    replace: true 
                });
                
            } else {
                alert(`인증서 인식에 실패했습니다.\n${response?.message || "다시 촬영해 주세요."}`);
                setSelectedFile(null);
            }
        } catch (error: any) {
            alert(`처리 중 오류가 발생했습니다.\n${error?.response?.data?.message || "잠시 후 다시 시도해주세요."}`);
            setSelectedFile(null);
        } finally {
            setIsLoading(false);
            e.target.value = '';
        }
    };

    // 버튼 클릭 핸들러
    const handleCameraClick = () => cameraInputRef.current?.click();
    const handleGalleryClick = () => galleryInputRef.current?.click();

    return (
        <DefaultLayout
            header={<CommonHeader title="" />}
            footer={
                <Footer>
                <Guide>
                    <img src="/img/mypage/security.png" style={{width:"16px", height:"16px"}}/>
                    업로드된 문서는 안전하게 암호화되어 처리되며, 
                    <br />인식 후 즉시 삭제됩니다.
                </Guide>
                <ResponsiveButton tone="blue" radius="pill" size="lg" onClick={handleCameraClick}>
                    <img src="/img/apply/camera.png" style={{width:"20px", height:"20px"}}/>
                    카메라로 촬영하기
                </ResponsiveButton>
                <ResponsiveButton variant="outline" tone="blue" radius="pill" size="lg" onClick={handleGalleryClick}>
                    <img src="/img/apply/apply.png" style={{width:"20px", height:"20px"}}/>
                    갤러리에서 선택하기
                </ResponsiveButton>

                <HiddenInput
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                />
                <HiddenInput
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                </Footer>
            }
        >
            <Wrapper>
            <Title>
                장기요양인증서 촬영
            </Title>
            <Caption>
                인증서를 촬영하거나 업로드하세요
            </Caption>

            <MyGrade>
                <TitleContainer>
                    <img src="/img/mypage/camera.png" style={{width:"20px", height:"20px"}}/>
                    촬영 가이드
                </TitleContainer>
                    <DetailList>
                        <DetailListItem>• 문서 전체가 화면에 들어오도록 촬영해주세요</DetailListItem>
                        <DetailListItem>• 빛 반사가 없는 곳에서 촬영해주세요</DetailListItem>
                        <DetailListItem>• 글씨가 선명하게 보이도록 촬영해주세요</DetailListItem>
                    </DetailList>
            </MyGrade>

            {(isLoading || selectedFile) && (
                <PhotoLoading>
                    {isLoading ? (
                        <LoadingContent>
                            <Spinner />
                            <LoadingText>인식 중...</LoadingText>
                        </LoadingContent>
                    ) : selectedFile ? (
                        <Preview src={URL.createObjectURL(selectedFile)} alt="선택된 이미지" />
                    ) : null}
                </PhotoLoading>
            )}
            
            </Wrapper>

        </DefaultLayout>
    )
}

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.8rem;
    margin-bottom: 2rem;
`;

const Guide = styled.div`
    display: flex;
    width: 100%;
    background-color: #FFF8F5;
    border: 0.68px solid #FFD4BF;
    border-radius: 10px;
    color: #FF9966;
    font-size: 12px;
    padding: 1rem 1.2rem;
    img{
        margin: 0px 8px 0 0;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem;
    align-items: center;
    ${({ theme }) => theme.fonts.heading2};
    color: ${({ theme }) => theme.colors.gray07};
    margin: 1rem 0 0 0;
    margin-bottom: 6px;
    white-space: nowrap;
    @media (max-width: 350px) {
        ${({ theme }) => theme.fonts.heading3};
    }
`;

const Caption = styled.div`
    ${({ theme }) => theme.fonts.title3};
    color: ${({ theme }) => theme.colors.gray05};
`;



const MyGrade = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 12px;
    width: 100%;
    border: 0.68px solid rgba(106,176,227,0.3);
    background: #F2FAFF;
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.blue01};
    flex-direction: column;
    align-items: start;
    gap: 0.2rem;
    padding: 0.9rem 1.2rem;
    margin-top: 3rem;
    p{
        color: ${({ theme }) => theme.colors.gray05};
        ${({ theme }) => theme.fonts.body4};
    }
`;

const TitleContainer = styled.div`
    ${({ theme }) => theme.fonts.heading3};
    color: #2d2d2d;
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 30px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DetailListItem = styled.li`
  ${({ theme }) => theme.fonts.body4};
  color: #717182;
  position: relative;
  display: flex;
  align-items: center;
`;


const PhotoLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px; 
    background: rgba(0, 0, 0, 0.5); 
    border-radius: 12px;
    margin-top: 1.5rem;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
`;

const LoadingContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 4px solid #E0E0E0;
    border-top: 4px solid ${({ theme }) => theme.colors.blue01};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
    font-weight: bold;
    color: #4A4A4A;
    margin: 0;
`;

const Preview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ResponsiveButton = styled(Button)`
  @media (max-width: 336px) {
    padding: 0.7rem 1.5rem !important;
    font-size: 14px !important;
  }
`;
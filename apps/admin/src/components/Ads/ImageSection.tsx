import { Wrapper, SectionTitle, Field } from "./BasicSection";
import styled from "styled-components";
import { useRef } from "react";

type Props = {
  existingImageUrls: string[];
  onExistingChange: (urls: string[]) => void;
  newImages: File[];
  onNewImagesChange: (files: File[]) => void;
};

export default function ImagesSection({
  existingImageUrls,
  onExistingChange,
  newImages,
  onNewImagesChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    onNewImagesChange([...newImages, ...files]);
    e.target.value = "";
  };

  const handleRemoveExisting = (url: string) => {
    onExistingChange(existingImageUrls.filter((u) => u !== url));
  };

  const handleRemoveNew = (idx: number) => {
    onNewImagesChange(newImages.filter((_, i) => i !== idx));
  };

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Wrapper>
      <SectionTitle>시설 이미지</SectionTitle>

      <Field>
        <Row>
          <FileInputBox onClick={handleOpenFileDialog}>
            이미지 추가
          </FileInputBox>

          <AddButton type="button" onClick={handleOpenFileDialog}>
            <img src="/img/ads/photo.svg" />
            추가
          </AddButton>

          {/* 숨겨진 실제 input */}
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </Row>

        <Helper>
          이미지는 사용자 앱의 시설 상세 페이지 상단 슬라이더에 표시됩니다.
        </Helper>
      </Field>

      <ThumbGrid>
        {existingImageUrls.map((url) => (
          <Thumb key={url}>
            <img src={url} alt="시설 이미지" />
            <RemoveThumbButton
              type="button"
              onClick={() => handleRemoveExisting(url)}
            >
              삭제
            </RemoveThumbButton>
          </Thumb>
        ))}

        {newImages.map((file, idx) => (
          <Thumb key={`${file.name}-${idx}`}>
            <ThumbName>{file.name}</ThumbName>
            <RemoveThumbButton
              type="button"
              onClick={() => handleRemoveNew(idx)}
            >
              취소
            </RemoveThumbButton>
          </Thumb>
        ))}
      </ThumbGrid>
    </Wrapper>
  );
}

/* ---------- styles ---------- */

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const FileInputBox = styled.div`
  flex: 1;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1.496px solid ${({ theme }) => theme.colors.gray03};
  background: ${({ theme }) => theme.colors.gray02};
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray06};
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

export const AddButton = styled.button`
  padding: 15px;
  border-radius: 10px;
  height: 48px;
  width: 80px;
  display: flex;
  border: none;
  cursor: pointer;
  ${({ theme }) => theme.fonts.title3};
  background: ${({ theme }) => theme.colors.blue01};
  color: #fff;
  align-items: center;
  gap: 8px;

  img {
    width: 16px;
  }
`;

const Helper = styled.span`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.gray04};
`;

const ThumbGrid = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Thumb = styled.div`
  width: 120px;
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.gray03};
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbName = styled.span`
  padding: 0 6px;
  text-align: center;
  ${({ theme }) => theme.fonts.caption};
`;

const RemoveThumbButton = styled.button`
  position: absolute;
  right: 4px;
  top: 4px;
  border-radius: 999px;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 2px 6px;
  ${({ theme }) => theme.fonts.caption};
  cursor: pointer;
`;

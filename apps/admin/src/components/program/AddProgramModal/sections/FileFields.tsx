//기획서, 사진 업로드

import { Button } from "@core/ui/button";
import UploadCard from "../uploads/UploadCard";
import FileList from "../uploads/FileList";
import ImageThumbGrid from "../uploads/ImageThumbGrid";
import * as S from "../modal.styles";
import toast from "react-hot-toast";
import { Label } from "@components/program/AddProgramModal/FormControls";

type Props = {
  proposal: File | null;
  setProposal: (f: File | null) => void;
  images: File[];
  setImages: (f: File[]) => void;
  onPickProposal: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPickImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  imgInputRef: React.RefObject<HTMLInputElement | null>;
};

export default function FileFields({
  proposal,
  setProposal,
  images,
  setImages,
  onPickProposal,
  onPickImages,
  fileInputRef,
  imgInputRef,
}: Props) {
  return (
    <div>
      <Label>
        <img src="/img/program/upload.svg" alt="" aria-hidden />
        첨부 서류
      </Label>

      <S.UploadSectionTitle>프로그램 기획서 (필수)</S.UploadSectionTitle>
      {!proposal ? (
        <UploadCard
          mainText="클릭하거나 파일을 드래그하여 업로드"
          subText="PDF 파일 (최대 15MB)"
          accept="application/pdf"
          maxSizeMB={15}
          required
          value={[]}
          onChange={(arr) => setProposal(arr[0] ?? null)}
          onReject={(msg) => toast.error(msg)}
          helperBottom="* 프로그램 목적, 내용, 일정, 강사 소개 등이 포함된 기획서를 PDF로 업로드해주세요"
        />
      ) : (
        <>
          <FileList files={[proposal]} onRemove={() => setProposal(null)} />
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={onPickProposal}
          />
        </>
      )}

      <S.UploadSectionTitle>프로그램 사진 (필수)</S.UploadSectionTitle>
      {images.length === 0 ? (
        <UploadCard
          mainText="클릭하거나 파일을 드래그하여 업로드"
          subText="이미지 파일 (최대 5MB)"
          accept="image/*"
          multiple
          maxCount={5}
          maxSizeMB={5}
          required
          value={[]}
          onChange={setImages}
          onReject={(msg) => toast.error(msg)}
          helperBottom="* 프로그램 활동 사진, 강사 사진, 포스터 등을 업로드하면 참여율이 높아집니다 (최대 5개)"
        />
      ) : (
        <>
          <ImageThumbGrid
            files={images}
            onRemove={(idx) => setImages(images.filter((_, i) => i !== idx))}
          />
          {images.length < 5 && (
            <div style={{ marginTop: 8 }}>
              <Button
                type="button"
                variant="subtle"
                onClick={() => imgInputRef.current?.click()}
              >
                사진 추가
              </Button>
            </div>
          )}
          <input
            ref={imgInputRef}
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={onPickImages}
          />
        </>
      )}
    </div>
  );
}

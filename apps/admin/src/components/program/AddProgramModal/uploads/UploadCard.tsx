import { useRef, useState } from "react";
import styled, { css } from "styled-components";

type Props = {
  mainText: string;
  subText?: string;
  accept: string;
  multiple?: boolean;
  iconSrc?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  required?: boolean;
  maxCount?: number;
  maxSizeMB?: number;
  onReject?: (msg: string) => void;
  helperBottom?: string;
  errorText?: string;
};

export default function UploadCard({
  mainText,
  subText,
  accept,
  multiple,
  iconSrc = "/img/program/uploadCard.svg",
  value,
  onChange,
  maxCount,
  maxSizeMB,
  onReject,
  helperBottom,
  errorText,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [drag, setDrag] = useState(false);

  const files = value ?? [];

  const applyFiles = (incoming: File[]) => {
    const accList = accept.split(",").map((s) => s.trim());
    const typeOk = (f: File) =>
      accList.some((acc) =>
        acc.endsWith("/*")
          ? f.type.startsWith(acc.replace("/*", "/"))
          : f.type === acc
      );

    const sizeOk = (f: File) =>
      maxSizeMB ? f.size <= maxSizeMB * 1024 * 1024 : true;

    const filtered = incoming.filter((f) => {
      if (!typeOk(f)) {
        onReject?.(`"${f.name}"은(는) 업로드 가능한 형식이 아닙니다.`);
        return false;
      }
      if (!sizeOk(f)) {
        onReject?.(
          `"${f.name}" 파일이 최대 용량(${maxSizeMB}MB)을 초과했습니다.`
        );
        return false;
      }
      return true;
    });

    // 개수 제한
    const merged = multiple ? [...files, ...filtered] : filtered.slice(0, 1);
    const sliced =
      maxCount && merged.length > maxCount ? merged.slice(0, maxCount) : merged;

    onChange?.(sliced);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = Array.from(e.target.files ?? []);
    applyFiles(arr);
    (e.target as HTMLInputElement).value = "";
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    const arr = Array.from(e.dataTransfer.files ?? []);
    applyFiles(arr);
  };

  return (
    <Wrap aria-invalid={!!errorText}>
      <DropZone
        role="button"
        tabIndex={0}
        $drag={drag}
        aria-label={mainText}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && inputRef.current?.click()
        }
        onDragEnter={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          setDrag(false);
        }}
        onDrop={onDrop}
      >
        {iconSrc && <Icon src={iconSrc} alt="" aria-hidden />}
        <MainText>{mainText}</MainText>
        {subText && <SubText>{subText}</SubText>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          multiple={!!multiple}
          onChange={onInputChange}
        />
      </DropZone>

      {errorText && (
        <Helper data-tone="error" role="alert">
          {errorText}
        </Helper>
      )}

      {helperBottom && <Helper>{helperBottom}</Helper>}
    </Wrap>
  );
}

/* ================= styles ================= */

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const DropZone = styled.div<{ $drag: boolean }>`
  position: relative;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray01};
  border: 1.907px solid ${({ theme }) => theme.colors.gray03};
  padding: 25.9px;
  text-align: center;
  cursor: pointer;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  ${({ $drag, theme }) =>
    $drag &&
    css`
      border-color: ${theme.colors.blue01};
      box-shadow: 0 0 0 4px ${theme.colors.blue01};
    `}

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.blue01};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.blue01};
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const MainText = styled.p`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray07};
`;

const SubText = styled.p`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray04};
  margin-top: 3.36px;
`;

const Helper = styled.p`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.gray04};
`;

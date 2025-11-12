import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button, ButtonLayout } from "@core/ui/button";
import InputContainer from "@core/components/inputContainer";
import TextAreaContainer from "@core/components/TextareaContainer";

import { isFutureDate, isHHmm, isValidPhone } from "@shared/validators/program";

import {
  postCreateProgram,
  type ProgramCategory,
  type CreateProgramReq,
} from "@apis/program/createProgram";

import * as S from "./modal.styles";
import { Field, Label, Helper, FileRow } from "./FormControls";
import TimeRangeField from "./fields/TimeField";
import DateField from "./fields/DateField";
import CategoryModal from "./fields/CategoryModal";
type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: (newId: number) => void;
  facilityName?: string;
};

const CATS: ProgramCategory[] = ["건강", "문화", "치료"];

function isProgramCategory(v: string): v is ProgramCategory {
  return (CATS as readonly ProgramCategory[]).includes(v as ProgramCategory);
}

export default function AddProgramModal({
  open,
  onClose,
  onSuccess,
  facilityName,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState("");
  type CategoryValue = ProgramCategory | "";
  const [category, setCategory] = useState<CategoryValue>("");
  const [instructorName, setInstructorName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [fee, setFee] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [suppliesText, setSuppliesText] = useState("");
  const [proposal, setProposal] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [catOpen, setCatOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (facilityName && !location) setLocation(facilityName);
  }, [facilityName]);

  const supplies = useMemo(
    () =>
      suppliesText
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean),
    [suppliesText]
  );

  if (!open) return null;

  /* ---------- handlers ---------- */
  const onPickProposal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      setErr("기획서는 PDF만 업로드 가능합니다.");
      (e.target as HTMLInputElement).value = "";
      return;
    }
    if (f.size > 15 * 1024 * 1024) {
      setErr("기획서 최대 용량은 15MB 입니다.");
      (e.target as HTMLInputElement).value = "";
      return;
    }
    setErr(null);
    setProposal(f);
  };

  const onPickImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fs = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    const next = [...images, ...fs].slice(0, 5);
    setImages(next);
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = (): string | null => {
    if (!name.trim()) return "프로그램명을 입력해주세요.";
    if (category === "") return "카테고리를 선택해주세요.";
    if (!isFutureDate(date)) return "일정은 오늘 이후 날짜여야 합니다.";
    if (!isHHmm(startTime) || !isHHmm(endTime))
      return "시간 형식은 HH:mm 입니다.";
    if (startTime >= endTime) return "종료 시간은 시작 시간 이후여야 합니다.";
    if (capacity !== "" && Number(capacity) < 1)
      return "정원은 1 이상이어야 합니다.";
    if (!isValidPhone(number)) return "전화번호 형식이 올바르지 않습니다.";
    if (!proposal) return "프로그램 기획서(PDF)는 필수입니다.";
    if (images.length > 5) return "이미지는 최대 5장까지 업로드 가능합니다.";
    return null;
  };

  const buildBody = (cat: ProgramCategory): CreateProgramReq => ({
    name,
    category: cat,
    instructorName: instructorName || null,
    date,
    startTime,
    endTime,
    location: location || null,
    capacity: capacity === "" ? null : Number(capacity),
    fee: fee || null,
    number: number || null,
    description: description || null,
    supplies,
    proposal: proposal!,
    images,
  });

  const onSubmit = async () => {
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    if (!isProgramCategory(category)) {
      setErr("카테고리를 선택해주세요.");
      return;
    }

    try {
      setBusy(true);
      setErr(null);
      const ok = await postCreateProgram(buildBody(category));
      setBusy(false);

      if (ok) {
        toast.success("프로그램이 등록되었습니다.");
        onClose();
        onSuccess?.(0);
      } else {
        setErr("프로그램 등록에 실패했습니다.");
      }
    } catch (e) {
      setBusy(false);
    }
  };

  /* ---------- render ---------- */
  return (
    <S.Backdrop role="dialog" aria-modal="true" onClick={onClose}>
      <S.Sheet onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.H2>새 프로그램 추가</S.H2>
          <S.Close onClick={onClose} aria-label="닫기" src="/img/close.svg" />
        </S.Header>
        <S.Content>
          <S.Notice>
            <img src="/img/program/addprogram.svg" />
            <div className="right">
              <p>프로그램 등록 안내</p>
              <p className="des">
                프로그램 기획서(PDF)와 관련 사진을 업로드해주세요. <br />
                상세한 정보는 더 높은 참가율로 이어집니다.
              </p>
            </div>
          </S.Notice>

          <S.Form>
            {/* 프로그램명 */}
            <InputContainer
              label="프로그램명"
              required
              placeholder="프로그램 이름을 입력하세요"
              value={name}
              onChange={setName}
              labelTypo="heading3"
              inputTypo="body2"
              variant="filled"
              labelColor="#1A1A1A"
            />

            <S.Grid2>
              <div style={{ position: "relative" }}>
                <InputContainer
                  label="카테고리"
                  required
                  value={category}
                  onChange={() => {}}
                  placeholder="건강"
                  variant="filled"
                  clickable
                  onClickInput={() => setCatOpen(true)}
                  labelColor="#1A1A1A"
                  labelTypo="heading3"
                  inputTypo="body2"
                />

                {/* 카테고리 선택 모달 */}
                <CategoryModal
                  open={catOpen}
                  value={category}
                  options={CATS as ProgramCategory[]}
                  onSelect={(v) => {
                    setCategory(v);
                    setCatOpen(false);
                  }}
                  onClose={() => setCatOpen(false)}
                />
              </div>
              {/* 강사명 */}
              <InputContainer
                label="강사명"
                placeholder="강사 이름"
                value={instructorName}
                onChange={setInstructorName}
                variant="filled"
                labelColor="#1A1A1A"
                labelTypo="heading3"
                inputTypo="body2"
              />
            </S.Grid2>

            {/* 일정 / 시간 */}
            <S.Grid2>
              <DateField required value={date} onChange={setDate} />

              <S.Flex>
                <TimeRangeField
                  required
                  startTime={startTime}
                  endTime={endTime}
                  onChangeStart={setStartTime}
                  onChangeEnd={setEndTime}
                />
              </S.Flex>
            </S.Grid2>

            {/* 장소 / 정원 */}
            <S.Grid2>
              <InputContainer
                label="장소"
                placeholder="장소를 입력하세요"
                value={location}
                onChange={setLocation}
                variant="filled"
                prefixIcon={
                  <img src="/img/program/location.svg" alt="" aria-hidden />
                }
                labelColor="#1A1A1A"
                labelTypo="heading3"
                inputTypo="body2"
              />

              <InputContainer
                label="정원"
                type="number"
                placeholder="20"
                value={capacity === "" ? "" : String(capacity)}
                onChange={(v) => setCapacity(v === "" ? "" : Number(v))}
                inputMode="numeric"
                variant="filled"
                prefixIcon={
                  <img src="/img/program/people.svg" alt="" aria-hidden />
                }
                labelColor="#1A1A1A"
                labelTypo="heading3"
                inputTypo="body2"
              />
            </S.Grid2>

            {/* 참가비 / 문의 전화 */}
            <S.Grid2>
              <InputContainer
                label="참가비"
                placeholder="예: 무료 / 5,000원"
                value={fee}
                onChange={setFee}
                variant="filled"
                prefixIcon={
                  <img src="/img/program/cost.svg" alt="" aria-hidden />
                }
                labelColor="#1A1A1A"
                labelTypo="heading3"
                inputTypo="body2"
              />
              <InputContainer
                label="문의 전화"
                type="tel"
                placeholder="010-1234-5678"
                value={number}
                onChange={setNumber}
                autoComplete="tel"
                variant="filled"
                inputMode="numeric"
                labelColor="#1A1A1A"
                labelTypo="heading3"
                inputTypo="body2"
              />
            </S.Grid2>

            {/* 프로그램 설명 */}
            <TextAreaContainer
              label="프로그램 설명"
              placeholder="프로그램에 대한 설명을 입력하세요"
              value={description}
              onChange={setDescription}
              labelTypo="heading3"
              textareaTypo="body2"
              placeholderTypo="body2"
              labelColor="#1A1A1A"
              placeholderColor="#A8A8A8"
            />

            {/* 준비물 */}
            <InputContainer
              label="준비물"
              placeholder="쉼표로 구분 (예: 편한 복장, 운동화, 물)"
              value={suppliesText}
              onChange={setSuppliesText}
              variant="filled"
              labelColor="#1A1A1A"
              labelTypo="heading3"
              inputTypo="body2"
            />

            <Field>
              <Label>첨부 서류</Label>
              <Helper>프로그램 기획서(PDF) — 최대 15MB (필수)</Helper>
              <FileRow>
                <Button
                  type="button"
                  variant="subtle"
                  onClick={() => fileInputRef.current?.click()}
                >
                  기획서 선택
                </Button>
                <span>{proposal?.name ?? "선택된 파일 없음"}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={onPickProposal}
                />
              </FileRow>

              <Helper>프로그램 사진 — 최대 5장 (선택)</Helper>
              <FileRow>
                <Button
                  type="button"
                  variant="subtle"
                  onClick={() => imgInputRef.current?.click()}
                >
                  사진 추가
                </Button>
                <span>
                  {images.length
                    ? `${images.length}장 선택됨`
                    : "선택된 사진 없음"}
                </span>
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  multiple
                  onChange={onPickImages}
                />
              </FileRow>

              {images.length > 0 && (
                <S.ThumbList>
                  {images.map((f, idx) => (
                    <S.Thumb key={idx}>
                      <img src={URL.createObjectURL(f)} alt={`img-${idx}`} />
                      <button
                        onClick={() => removeImage(idx)}
                        aria-label="삭제"
                      >
                        ×
                      </button>
                    </S.Thumb>
                  ))}
                </S.ThumbList>
              )}
            </Field>

            {err && <S.Error role="alert">{err}</S.Error>}

            <ButtonLayout type="row" gap={12}>
              <Button tone="gray" variant="subtle" onClick={onClose}>
                취소
              </Button>
              <Button onClick={onSubmit} disabled={busy} aria-busy={busy}>
                {busy ? "추가 중..." : "추가"}
              </Button>
            </ButtonLayout>
          </S.Form>
        </S.Content>
      </S.Sheet>
    </S.Backdrop>
  );
}

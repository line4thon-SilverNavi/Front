import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button, ButtonLayout } from "@core/ui/button";
import * as S from "./AddProgramModal/modal.styles";

import { getProgramDetail } from "@apis/program/getProgramDetail";
import { patchProgram } from "@apis/program/patchProgram";
import type { ProgramDetail, PatchProgramPayload } from "@apis/program/types";

import {
  isProgramCategory,
  useAddProgramForm,
  VALID_CATS,
} from "./AddProgramModal/useAddProgramForm";

import BasicFields from "./AddProgramModal/sections/BasicFields";
import ScheduleFields from "./AddProgramModal/sections/ScheduleFields";
import LocationCapacityFields from "./AddProgramModal/sections/LocationCapacityFields";
import FeeContactFields from "./AddProgramModal/sections/FeeContanctFields";
import DesSupplyFields from "./AddProgramModal/sections/DesSupplyFields";
import { Field } from "./AddProgramModal/FormControls";
import FileFields from "./AddProgramModal/sections/FileFields";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  programId: number | null;
  facilityName?: string;
};

const jsonEq = (a: unknown, b: unknown) =>
  JSON.stringify(a) === JSON.stringify(b);

const trim = (s: string) => s.trim();

// 문자열: 변경 없으면 null(유지), 비우면 ""(제거) 가능 필드에만 적용
function diffString(
  nextRaw: string,
  prevRaw: string | null | undefined,
  removable: boolean
): string | null {
  const next = trim(nextRaw);
  const prev = trim(prevRaw ?? "");
  if (next === prev) return null; // 유지
  if (removable && next === "") return ""; // 제거
  return next; // 변경 반영
}

// 날짜/시간: 변경 없으면 null(유지)
function diffYMD(next: string, prev: string | null | undefined): string | null {
  if ((prev ?? "") === next) return null;
  return next;
}
function diffHM(next: string, prev: string | null | undefined): string | null {
  if ((prev ?? "") === next) return null;
  return next;
}

function diffCategory(
  next: string,
  prev: string | null | undefined
): string | null {
  if ((prev ?? "") === next) return null;
  return isProgramCategory(next) ? next : null;
}

function diffCapacity(
  next: number | "",
  prev: number | null | undefined
): number | null {
  const prevStr = prev == null ? "" : String(prev);
  const nextStr = next === "" ? "" : String(next);
  if (nextStr === prevStr) return null;
  if (next === "") return -1;
  const n = Number(next);
  if (!Number.isFinite(n)) return null;
  return Math.max(1, n);
}

function diffList(
  next: string[],
  prev: string[] | null | undefined
): string[] | null {
  const p = prev ?? [];
  if (jsonEq(next, p)) return null; // 유지
  if (next.length === 0) return []; // 제거
  return next; // 변경
}

/* ------------------------------------------------------------------ */

export default function EditProgramModal({
  open,
  onClose,
  programId,
  facilityName,
}: Props) {
  const f = useAddProgramForm(facilityName);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const originalRef = useRef<ProgramDetail | null>(null);

  useEffect(() => {
    if (open) f.reset();
  }, [open]);

  // 상세 로드
  useEffect(() => {
    if (!open || !programId) return;
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const d = await getProgramDetail(programId);
        if (!alive) return;

        originalRef.current = d;

        f.setName(d.name);
        f.setInstructorName(d.instructorName ?? "");
        f.setCategory(isProgramCategory(d.category) ? d.category : f.category);
        f.setDate(d.date);
        f.setStartTime(d.startTime);
        f.setEndTime(d.endTime);
        f.setLocation(d.location ?? "");
        f.setCapacity(d.capacity == null ? "" : Number(d.capacity));
        f.setFee(d.fee ?? "");
        f.setNumber(d.number ?? "");
        f.setDescription(d.description ?? "");
        f.setSuppliesText((d.supplies ?? []).join("\n"));

        f.setProposal(null);
        f.setImages([]);
      } catch (e: any) {
        toast.error(e?.message || "프로그램 정보를 불러오지 못했습니다.");
        onClose();
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [open, programId]);

  /* ---------- 로컬 검증 ---------- */
  const prev = originalRef.current;

  const isValid = useMemo(() => {
    if (!f.name || !f.startTime || !f.endTime || !f.date) return false;
    if (f.startTime > f.endTime) return false;

    // 날짜는 "바뀐 경우"에만 현재보다 뒤인지 검증
    if (prev && f.date !== prev.date) {
      const today = new Date();
      const d = new Date(f.date + "T00:00:00");
      const todayYMD = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      if (d <= todayYMD) return false;
    }

    // 전화번호는 입력이 있을 때만 검사 (비우면 제거 규칙으로 처리)
    if (f.number.trim() && !/^\d{2,3}-\d{3,4}-\d{4}$/.test(f.number)) {
      return false;
    }

    // 카테고리 유효성
    if (!isProgramCategory(f.category)) return false;

    return true;
  }, [
    f.name,
    f.startTime,
    f.endTime,
    f.date,
    f.number,
    f.category,
    prev?.date,
  ]);

  if (!open) return null;

  // PATCH
  function buildPayload(): PatchProgramPayload {
    const prev = originalRef.current!;
    const suppliesArr = f.suppliesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    return {
      // name: 제거 규칙 없음 → 변경 없으면 null, 변경 시 값
      name: f.name === prev.name ? null : f.name.trim(),

      // category: 변경 없으면 null, 변경 시 유효하면 값
      category: diffCategory(f.category, prev.category),

      // 문자열들: 변경 없으면 null, 비우면 ""(제거)
      instructorName: diffString(f.instructorName, prev.instructorName, true),
      date: diffYMD(f.date, prev.date),
      startTime: diffHM(f.startTime, prev.startTime),
      endTime: diffHM(f.endTime, prev.endTime),
      location: diffString(f.location, prev.location, true),

      // capacity: 변경 없으면 null, 빈칸("") -> -1(제거), 숫자는 최소 1
      capacity: diffCapacity(f.capacity, prev.capacity),

      fee: diffString(f.fee, prev.fee, true),
      number: diffString(f.number, prev.number, true),
      description: diffString(f.description, prev.description, true),

      // supplies: 변경 없으면 null, 빈 → [] (제거)
      supplies: diffList(suppliesArr, prev.supplies),

      // 파일/이미지: 선택 시에만 전송
      proposal: f.proposal ?? null, // 새 PDF 선택 시에만 append
      newImages: f.images && f.images.length ? f.images : undefined,

      // TODO: api 확인 필요
      // isDeleteProposal: f.deleteProposal ?? false,
      // existingImageUrls: f.existingImageUrls,
    } as PatchProgramPayload;
  }

  const handleSubmit = async () => {
    if (!programId) return;
    if (!isValid) {
      toast.error("필수값 또는 형식을 확인해주세요.");
      return;
    }

    try {
      setSaving(true);
      await patchProgram(programId, buildPayload());
      onClose();
      toast.success("수정되었습니다.");
    } catch (e: any) {
      toast.error(e?.message || "수정 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <S.Backdrop role="dialog" aria-modal="true" onClick={onClose}>
      <S.Sheet onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.H2>프로그램 수정</S.H2>
          <S.Close onClick={onClose} aria-label="닫기" src="/img/close.svg" />
        </S.Header>

        <S.Content aria-busy={loading}>
          <S.Notice>
            <img src="/img/program/addprogram.svg" alt="" />
            <div className="right">
              <p>프로그램 수정</p>
              <p className="des">변경할 정보를 확인하고 수정하세요.</p>
            </div>
          </S.Notice>

          <S.Form>
            <BasicFields
              name={f.name}
              setName={f.setName}
              instructorName={f.instructorName}
              setInstructorName={f.setInstructorName}
              category={f.category}
              catOpen={f.catOpen}
              setCatOpen={f.setCatOpen}
              categories={[...VALID_CATS]}
              onSelectCategory={(v) => f.setCategory(v)}
            />

            <ScheduleFields
              date={f.date}
              setDate={f.setDate}
              startTime={f.startTime}
              setStartTime={f.setStartTime}
              endTime={f.endTime}
              setEndTime={f.setEndTime}
            />

            <LocationCapacityFields
              location={f.location}
              setLocation={f.setLocation}
              capacity={f.capacity}
              setCapacity={f.setCapacity}
            />

            <FeeContactFields
              fee={f.fee}
              setFee={f.setFee}
              number={f.number}
              setNumber={f.setNumber}
            />

            <DesSupplyFields
              description={f.description}
              setDescription={f.setDescription}
              suppliesText={f.suppliesText}
              setSuppliesText={f.setSuppliesText}
            />

            <Field>
              <FileFields
                proposal={f.proposal}
                setProposal={f.setProposal}
                images={f.images}
                setImages={f.setImages}
                onPickProposal={f.onPickProposal}
                onPickImages={f.onPickImages}
                fileInputRef={f.fileInputRef}
                imgInputRef={f.imgInputRef}
                // existingImageUrls={f.existingImageUrls}
                // setExistingImageUrls={f.setExistingImageUrls}
                // deleteProposal={f.deleteProposal}
                // setDeleteProposal={f.setDeleteProposal}
              />
            </Field>
          </S.Form>
        </S.Content>

        <S.BtnBar>
          <ButtonLayout type="row" gap={12}>
            <Button
              tone="gray"
              variant="subtle"
              onClick={onClose}
              size="lg"
              typo="heading2"
              disabled={saving || loading}
            >
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={saving || loading || !isValid}
              aria-busy={saving || loading}
              size="lg"
              typo="heading2"
            >
              {saving ? "수정 중" : "수정"}
            </Button>
          </ButtonLayout>
        </S.BtnBar>
      </S.Sheet>
    </S.Backdrop>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { isFutureDate, isHHmm, isValidPhone } from "@shared/validators/program";
import {
  postCreateProgram,
  type ProgramCategory,
  type CreateProgramReq,
} from "@apis/program/createProgram";

export const CATS: ProgramCategory[] = ["건강", "문화", "치료"];

export function useAddProgramForm(facilityName?: string) {
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

  const isProgramCategory = (v: string): v is ProgramCategory =>
    (CATS as readonly ProgramCategory[]).includes(v as ProgramCategory);

  const onPickProposal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      setErr("기획서는 PDF만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }
    if (f.size > 15 * 1024 * 1024) {
      setErr("기획서 최대 용량은 15MB 입니다.");
      e.target.value = "";
      return;
    }
    setErr(null);
    setProposal(f);
  };

  const onPickImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const valid = files.filter((f) => {
      if (!f.type.startsWith("image/")) return false;
      const ok = f.size <= 5 * 1024 * 1024;
      if (!ok) toast.error(`"${f.name}" 파일이 5MB를 초과합니다.`);
      return ok;
    });
    const next = [...images, ...valid].slice(0, 5);
    if (next.length === images.length && valid.length) {
      toast.error("이미지는 최대 5장까지 업로드 가능합니다.");
    }
    setImages(next);
    e.target.value = "";
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
    if (images.length < 1) return "프로그램 사진은 최소 1장이 필요합니다.";
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

  const submit = async (
    onSuccess?: (newId: number) => void,
    onClose?: () => void
  ) => {
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
        onClose?.();
        onSuccess?.(0);
      } else {
        setErr("프로그램 등록에 실패했습니다.");
      }
    } catch {
      setBusy(false);
    }
  };

  return {
    busy,
    err,
    name,
    setName,
    category,
    setCategory,
    catOpen,
    setCatOpen,
    instructorName,
    setInstructorName,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    location,
    setLocation,
    capacity,
    setCapacity,
    fee,
    setFee,
    number,
    setNumber,
    description,
    setDescription,
    suppliesText,
    setSuppliesText,
    supplies,
    proposal,
    setProposal,
    images,
    setImages,
    fileInputRef,
    imgInputRef,
    onPickProposal,
    onPickImages,
    submit,
    CATS,
  };
}

import { useMemo, useRef, useState } from "react";
import type React from "react";
import toast from "react-hot-toast";
import { isFutureDate, isHHmm, isValidPhone } from "@shared/validators/program";
import {
  postCreateProgram,
  type ProgramCategory,
  type CreateProgramReq,
} from "@apis/program/createProgram";

export const VALID_CATS = ["건강", "문화", "치료"] as const;
export type CategoryValue = ProgramCategory | "";

export const isProgramCategory = (v: string): v is ProgramCategory =>
  (VALID_CATS as readonly string[]).includes(v);
export const CATS: ProgramCategory[] = [...VALID_CATS];

export function useAddProgramForm(facilityName?: string) {
  const makeInit = () => ({
    name: "",
    category: "" as CategoryValue,
    instructorName: "",
    date: "",
    startTime: "",
    endTime: "",
    location: facilityName || "",
    capacity: "" as number | "",
    fee: "",
    number: "",
    description: "",
    suppliesText: "",
    proposal: null as File | null,
    images: [] as File[],
  });

  const [busy, setBusy] = useState(false);
  const [state, setState] = useState(makeInit());
  const [catOpen, setCatOpen] = useState(false);

  const setName = (v: string) => setState((s) => ({ ...s, name: v }));
  const setCategory = (v: CategoryValue) =>
    setState((s) => ({ ...s, category: v }));
  const setInstructorName = (v: string) =>
    setState((s) => ({ ...s, instructorName: v }));
  const setDate = (v: string) => setState((s) => ({ ...s, date: v }));
  const setStartTime = (v: string) => setState((s) => ({ ...s, startTime: v }));
  const setEndTime = (v: string) => setState((s) => ({ ...s, endTime: v }));
  const setLocation = (v: string) => setState((s) => ({ ...s, location: v }));
  const setCapacity = (v: number | "") =>
    setState((s) => ({ ...s, capacity: v }));
  const setFee = (v: string) => setState((s) => ({ ...s, fee: v }));
  const setNumber = (v: string) => setState((s) => ({ ...s, number: v }));
  const setDescription = (v: string) =>
    setState((s) => ({ ...s, description: v }));
  const setSuppliesText = (v: string) =>
    setState((s) => ({ ...s, suppliesText: v }));
  const setProposal = (f: File | null) =>
    setState((s) => ({ ...s, proposal: f }));
  const setImages = (arr: File[]) => setState((s) => ({ ...s, images: arr }));

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const reset = () => {
    setState(makeInit());
    setCatOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imgInputRef.current) imgInputRef.current.value = "";
  };

  const supplies = useMemo(
    () =>
      state.suppliesText
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean),
    [state.suppliesText]
  );

  const validate = (): boolean => {
    const {
      name,
      category,
      date,
      startTime,
      endTime,
      capacity,
      number,
      proposal,
      images,
    } = state;
    if (!name.trim()) return (toast.error("프로그램명을 입력해주세요."), false);
    if (category === "")
      return (toast.error("카테고리를 선택해주세요."), false);
    if (!isFutureDate(date))
      return (toast.error("일정은 오늘 이후 날짜여야 합니다."), false);
    if (!isHHmm(startTime) || !isHHmm(endTime))
      return (toast.error("시간 형식은 HH:mm 입니다."), false);
    if (startTime >= endTime)
      return (toast.error("종료 시간은 시작 시간 이후여야 합니다."), false);
    if (capacity !== "" && Number(capacity) < 1)
      return (toast.error("정원은 1 이상이어야 합니다."), false);
    if (!isValidPhone(number))
      return (toast.error("전화번호 형식이 올바르지 않습니다."), false);
    if (!proposal)
      return (toast.error("프로그램 기획서(PDF)는 필수입니다."), false);
    if (images.length < 1)
      return (toast.error("프로그램 사진은 최소 1장이 필요합니다."), false);
    if (images.length > 5)
      return (toast.error("이미지는 최대 5장까지 업로드 가능합니다."), false);
    return true;
  };

  const buildBody = (cat: ProgramCategory): CreateProgramReq => ({
    name: state.name.trim(),
    category: cat,
    instructorName: state.instructorName.trim() || null,
    date: state.date,
    startTime: state.startTime,
    endTime: state.endTime,
    location: state.location.trim() || null,
    capacity: state.capacity === "" ? null : Number(state.capacity),
    fee: state.fee.trim() || null,
    number: state.number.trim() || null,
    description: state.description.trim() || null,
    supplies,
    proposal: state.proposal!,
    images: state.images,
  });

  const submit = async (
    onSuccess?: (newId: number) => void,
    onClose?: () => void
  ) => {
    if (!validate()) return;

    const cat = state.category;
    if (cat === "") return toast.error("카테고리를 선택해주세요.");

    try {
      setBusy(true);
      const ok = await postCreateProgram(buildBody(cat as ProgramCategory));
      setBusy(false);
      if (ok) {
        toast.success("프로그램이 등록되었습니다.");
        onClose?.();
        onSuccess?.(0);
      } else {
        toast.error("프로그램 등록에 실패했습니다.");
      }
    } catch {
      setBusy(false);
      toast.error("요청 중 오류가 발생했습니다.");
    }
  };

  const onPickProposal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setState((s) => ({ ...s, proposal: file }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onPickImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setState((s) => {
      const merged = [...s.images, ...files];
      if (merged.length > 5) {
        toast.error("이미지는 최대 5장까지 업로드 가능합니다.");
        return { ...s, images: merged.slice(0, 5) };
      }
      return { ...s, images: merged };
    });

    if (imgInputRef.current) imgInputRef.current.value = "";
  };

  return {
    busy,
    name: state.name,
    setName,
    category: state.category,
    setCategory,
    catOpen,
    setCatOpen,
    instructorName: state.instructorName,
    setInstructorName,
    date: state.date,
    setDate,
    startTime: state.startTime,
    setStartTime,
    endTime: state.endTime,
    setEndTime,
    location: state.location,
    setLocation,
    capacity: state.capacity,
    setCapacity,
    fee: state.fee,
    setFee,
    number: state.number,
    setNumber,
    description: state.description,
    setDescription,
    suppliesText: state.suppliesText,
    setSuppliesText,
    supplies,
    proposal: state.proposal,
    setProposal,
    images: state.images,
    setImages,
    fileInputRef,
    imgInputRef,
    submit,
    reset,
    CATS: VALID_CATS,
    onPickProposal,
    onPickImages,
  };
}

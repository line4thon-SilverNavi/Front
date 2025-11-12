import { postNoResponse } from "@core/api/instance";
export type ProgramCategory = "건강" | "문화" | "치료";

export type CreateProgramReq = {
  name: string;
  category: ProgramCategory;
  instructorName?: string | null;
  date: string;
  startTime: string;
  endTime: string;
  location?: string | null;
  capacity?: number | null;
  fee?: string | null;
  number?: string | null;
  description?: string | null;
  supplies?: string[];
  proposal: File;
  images?: File[];
};

export async function postCreateProgram(
  body: CreateProgramReq
): Promise<boolean> {
  const fd = new FormData();

  fd.append("name", body.name);
  fd.append("category", body.category);
  if (body.instructorName) fd.append("instructorName", body.instructorName);
  fd.append("date", body.date);
  fd.append("startTime", body.startTime);
  fd.append("endTime", body.endTime);
  if (body.location) fd.append("location", body.location);
  if (typeof body.capacity === "number")
    fd.append("capacity", String(body.capacity));
  if (body.fee) fd.append("fee", body.fee);
  if (body.number) fd.append("number", body.number);
  if (body.description) fd.append("description", body.description);
  (body.supplies ?? []).forEach((s) => fd.append("supplies", s));
  fd.append("proposal", body.proposal);
  (body.images ?? []).forEach((img) => fd.append("images", img));

  const ok = await postNoResponse("/api/programs", fd);
  return ok;
}

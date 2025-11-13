import instance from "@core/api/instance";
import type { PatchProgramPayload, ApiEnvelope, ProgramDetail } from "./types";

const fdAdd = (fd: FormData, key: string, val: unknown) => {
  if (val === null || val === undefined) return;
  if (Array.isArray(val)) fd.append(key, JSON.stringify(val));
  else fd.append(key, String(val));
};

export async function patchProgram(
  id: number,
  payload: PatchProgramPayload
): Promise<ProgramDetail> {
  const fd = new FormData();

  fdAdd(fd, "name", payload.name);
  fdAdd(fd, "category", payload.category);
  fdAdd(fd, "instructorName", payload.instructorName);
  fdAdd(fd, "date", payload.date);
  fdAdd(fd, "startTime", payload.startTime);
  fdAdd(fd, "endTime", payload.endTime);
  fdAdd(fd, "location", payload.location);
  fdAdd(fd, "capacity", payload.capacity);
  fdAdd(fd, "fee", payload.fee);
  fdAdd(fd, "number", payload.number);
  fdAdd(fd, "description", payload.description);
  fdAdd(fd, "supplies", payload.supplies);
  fdAdd(fd, "isDeleteProposal", payload.isDeleteProposal);

  if (payload.proposal) fd.append("proposal", payload.proposal);
  payload.newImages?.forEach((f) => fd.append("newImages", f));
  if (payload.existingImageUrls)
    fd.append("existingImageUrls", JSON.stringify(payload.existingImageUrls));

  const res = await instance.patch<ApiEnvelope<ProgramDetail>>(
    `/api/programs/${id}`,
    fd
  );

  if (!res.data?.isSuccess) {
    throw new Error(res.data?.message || "프로그램 수정에 실패했습니다.");
  }
  return res.data.data;
}

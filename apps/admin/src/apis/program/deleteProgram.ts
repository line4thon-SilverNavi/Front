import { deleteResponse } from "@core/api/instance";

export async function deleteProgram(programId: number) {
  const res = await deleteResponse(`/api/programs/${programId}`);
  return Boolean(res);
}

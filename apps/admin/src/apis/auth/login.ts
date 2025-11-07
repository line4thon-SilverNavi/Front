import { postResponse } from "@core/api/instance";
import type { AdminLoginRequest, LoginResponse } from "@core/api/login_type";

export async function postLogin(body: AdminLoginRequest) {
  return await postResponse<AdminLoginRequest, LoginResponse>(
    "/api/managers/signin",
    body
  );
}

import { postResponse } from "@core/api/instance";
import type { LoginRequest, LoginResponse } from "@core/api/login_type";

export async function postLogin(body: LoginRequest) {
  return await postResponse<LoginRequest, LoginResponse>(
    "/api/users/signin",
    body
  );
}

import { postResponse } from "@core/api/instance";

export type LoginRequest = {
  id: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  message: string;
  isSuccess: boolean;
  code: string;
};

export async function postLogin(body: LoginRequest) {
  return await postResponse<LoginRequest, LoginResponse>(
    "/api/managers/signin",
    body
  );
}

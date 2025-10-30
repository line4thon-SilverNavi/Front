import { postResponse } from "@core/api/instance";

export type LoginRequest = {
  id: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  careGrade: string | null;
};

export async function postLogin(body: LoginRequest) {
  return await postResponse<LoginRequest, LoginResponse>(
    "/api/users/signin",
    body
  );
}

import { postNoResponse } from "@core/api/instance";

export type LoginRequest = {
  name: string;
  phone: string;
  relation: string;
  password: string;
  passwordCheck: string;
};

export async function postSignup(body: LoginRequest) {
  return await postNoResponse<LoginRequest>("/api/users/signup", body);
}

import { postResponse } from "@core/api/instance";

export type SignupRequest = {
  name: string;
  affiliateCode: string;
  loginId: string;
  password: string;
  passwordCheck: string;
};

export type SignupResponse = {
  isSuccess: string;
  message: string;
};

export async function postSignup(body: SignupRequest) {
  return await postResponse<SignupRequest, SignupResponse>(
    "/api/managers/signup",
    body
  );
}

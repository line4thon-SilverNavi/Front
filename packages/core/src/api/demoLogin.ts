import { setTokens } from "./auth";
import { postResponse } from "./instance";
import type { LoginResponse } from "./login_type";

export async function postDemoLogin(role: "user" | "admin" = "user") {
  try {
    const id =
      role === "admin"
        ? import.meta.env.VITE_DEMO_ADMIN_ID
        : import.meta.env.VITE_DEMO_USER_ID;
    const password =
      role === "admin"
        ? import.meta.env.VITE_DEMO_ADMIN_PASSWORD
        : import.meta.env.VITE_DEMO_USER_PASSWORD;

    if (!id || !password)
      throw new Error(`데모 ${role} 계정 정보가 설정되어 있지 않습니다.`);

    const endpoint =
      role === "admin" ? "/api/managers/signin" : "/api/users/signin";

    const body =
      role === "admin" ? { loginId: id, password } : { id, password };

    const res = await postResponse<typeof body, LoginResponse>(endpoint, body);

    if (!res) throw new Error("서버 응답이 없습니다.");

    setTokens({ access: res.data.token, refresh: "", name: res.data.name });
    localStorage.setItem("user_type", role);

    return true;
  } catch (err) {
    console.error(`데모 ${role} 로그인 오류:`, err);
    return false;
  }
}

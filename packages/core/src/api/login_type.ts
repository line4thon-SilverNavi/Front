export type LoginRequest = {
  id: string;
  password: string;
};

export type AdminLoginRequest = {
  loginId: string;
  password: string;
};

export type LoginResponse = {
  data: {
    token: string;
    careGrade: string | null;
    name?: string;
  };

  message: string;
  isSuccess: boolean;
};

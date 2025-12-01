import { api } from "../httpClient";

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface UserInfo {
  userId: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
  register: async (credentials: RegisterCredentials) => {
    const response = await api.post("/auth/register", credentials);
    return response.data;
  },
  getMe: async (): Promise<UserInfo> => {
    console.log("Request headers:", api.defaults.headers);
    console.log("Auth cookie:", document.cookie);
    const response = await api.get<UserInfo>("/auth/me");
    return response.data;
  },

  loginWithOAuth: (provider: string) => {
    window.location.href = `${api.defaults.baseURL}/auth/oauth/${provider}`;
  },
};

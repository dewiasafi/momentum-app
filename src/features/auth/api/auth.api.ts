import { apiClient } from "@/services/apiClient";
import type {
  ApiResponse,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponseData,
  RegisterFormData,
  RegisterPayload,
  RegisterResponseData,
  ResendVerificationPayload,
  ResetPasswordPayload,
  SessionStatusData,
  UpdateProfilePayload,
  User,
  VerifyEmailPayload,
} from "../types";

export const authApi = {
  register: async (payload: RegisterPayload): Promise<ApiResponse<RegisterResponseData>> => {
    const response = await apiClient.post<ApiResponse<RegisterResponseData>>(
      "/auth/register",
      payload
    );
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> => {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>(
      "/auth/login",
      payload
    );
    return response.data;
  },

  verifyEmail: async (payload: VerifyEmailPayload): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>(
      "/auth/verify-email",
      payload
    );
    return response.data;
  },

  resendVerification: async (payload: ResendVerificationPayload): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>(
      "/auth/resend-verification",
      payload
    );
    return response.data;
  },

  getSession: async (): Promise<ApiResponse<SessionStatusData>> => {
    const response = await apiClient.get<ApiResponse<SessionStatusData>>("/auth/session");
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>("/profile/me");
    return response.data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch<ApiResponse<User>>("/profile/me", payload);
    return response.data;
  },


  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>(
      "/auth/logout",
    );

    return response.data;
  },
  forgotPassword: async ( payload: ForgotPasswordPayload
    ): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>(
      "/auth/forgot-password",
      payload
    );
    return response.data;
  },
  resetPassword: async (
  payload: ResetPasswordPayload
): Promise<ApiResponse<null>> => {
  const response = await apiClient.post<ApiResponse<null>>(
    "/auth/reset-password",
    payload
  );

  return response.data;
},

};

export const registerUserApi = async (data: RegisterFormData) => {
  return authApi.register({
    name: data.name,
    email: data.email,
    password: data.password,
  });
};
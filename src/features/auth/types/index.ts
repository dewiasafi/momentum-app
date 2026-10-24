export interface ApiResponse<T = null> {
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  error: string;
}


export interface User {
  id: string;
  email: string;
  name: string;
  email_verified_at?: string | null;
  created_at: string;
}

export type AuthUser = User;

//AUTH
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  token: string;
}

export interface ResendVerificationPayload {
  email: string;
}

export interface UpdateProfilePayload {
  name: string;
}

// RESPONSE DATA AUTH
export interface RegisterResponseData {
  user: User;
}

export interface LoginResponseData {
  user: User;
}

export interface SessionStatusData {
  active: boolean;
}

export type RegisterResponse = ApiResponse<RegisterResponseData>;

export type LoginResponse = ApiResponse<LoginResponseData>;

export type SessionResponse = ApiResponse<SessionStatusData>;

export type ProfileResponse = ApiResponse<User>;


export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ForgotPasswordFormValues {
  email: string;
}


export interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    payloadOrEmail: LoginPayload | string,
    password?: string,
  ) => Promise<LoginResponseData>;

  logout: () => void;
  refreshProfile: () => Promise<User | null>;
  checkSession: () => Promise<boolean>;
}

export interface ForgotPasswordPayload {
  email: string;
}
export interface ResetPasswordPayload {
  token: string;
  new_password: string;
}
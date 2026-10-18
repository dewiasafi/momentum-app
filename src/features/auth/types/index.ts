// Standard API Envelope Response
export interface ApiResponse<T = null> {
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  error: string;
}

// User & Entity
export interface User {
  id: string;
  email: string;
  name: string;
  email_verified_at?: string | null;
  created_at: string;
}

// For backward compatibility if needed
export type AuthUser = User;

// Request Payloads
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

// Auth Responses
export interface RegisterResponseData {
  user: User;
}

export interface LoginResponseData {
  token: string;
  user: User;
}

export interface SessionStatusData {
  active: boolean;
}

// UI & Form Types
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
  login: (payloadOrEmail: LoginPayload | string, password?: string) => Promise<LoginResponseData>;
  logout: () => void;
  refreshProfile: () => Promise<User | null>;
  checkSession: () => Promise<boolean>;
}

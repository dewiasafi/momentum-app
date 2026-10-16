// Mock users — ganti dengan API call nyata saat backend auth sudah siap

export type UserRole = "admin" | "user";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string; // plain-text hanya untuk mock! Jangan pakai ini di production
  role: UserRole;
  avatar?: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    name: "Dea Adminia",
    email: "admin@momentum.app",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Budi Pengguna",
    email: "user@momentum.app",
    password: "user123",
    role: "user",
  },
];


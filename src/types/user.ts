export interface UserProfile {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
    role?: string;
}

export type UserRole = "admin" | "member" | "guest";
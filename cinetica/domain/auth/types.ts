// domain/auth/types.ts
export interface Credentials {
    username: string;
    password: string;
}

export interface AuthResult {
    success: boolean;
    error?: string;
}
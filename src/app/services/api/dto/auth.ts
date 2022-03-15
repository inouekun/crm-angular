export interface LoginCredential {
    staffId: string;
    password: string;
}

export interface ResetPasswordRequest {
    staffId: string;
    password: string;
    confirmPassword: string;
    token: string;
}

export interface LoginResponse {
    token: string;
    role: string;
}

export interface ForgotPasswordResponse {
    message: string;
}

export interface ResetPasswordResponse {
    message: string;
}
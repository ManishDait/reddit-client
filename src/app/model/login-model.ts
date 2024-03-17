export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    authToken: string,
    refereshToken: string;
    expiresAt: Date;
    username: string;
}

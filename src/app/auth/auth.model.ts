export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    error: string | null;
}
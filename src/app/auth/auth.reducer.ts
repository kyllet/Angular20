import { createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.model";
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    isLoggedIn: false,
    error: null
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.registerUser, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(AuthActions.registerSuccess, (state, {user}) => ({
        ...state,
        isLoading: false,
        error: null
    })),

    on(AuthActions.registerFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error: error.message || 'Registration failed'
    })),

    on(AuthActions.loginUser, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(AuthActions.loginSuccess, (state, {authResponse}) => ({
        ...state,
        user: authResponse.user,
        isLoading: false,
        isLoggedIn: true,
        token: authResponse.accessToken,
        error: null
    })),

    on(AuthActions.loginFailure, (state, {error}) => ({
        ...state,
        user: null,        
        isLoading: false,
        isLoggedIn: false,
        token: null,
        error: error.message || 'Login failed'
    })),
    on(AuthActions.logoutUser, (state) => ({
        ...initialState
    }))

);
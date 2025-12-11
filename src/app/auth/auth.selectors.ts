import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.model";
import * as fromAuth from './auth.reducer'
import { stat } from "fs";

export const selectAuthState = createFeatureSelector<AuthState>(fromAuth.authFeatureKey);

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectToken = createSelector(
    selectAuthState,
    (state) => state.token
)

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state) => state.isLoggedIn
)
export const selectAuthLoading = createSelector(
    selectAuthState,
    (state) => state.isLoading
)
export const selectAuthError = createSelector(
    selectAuthState,
    (state) => state.error
)

export const selectUserId = createSelector(
    selectUser,
    (user) => user?.id
)
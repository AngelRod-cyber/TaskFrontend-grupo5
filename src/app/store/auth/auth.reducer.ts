import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
}

export const initialState: AuthState = {
  token: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { token }) => ({ ...state, token })),
  on(AuthActions.logout, () => initialState)
);

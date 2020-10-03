import { createAction, props } from "@ngrx/store";



export enum AuthActionTypes {
  Authenticate = "[Auth] Authenticate",
  AuthenticateSuccess = "[Auth] Success",
  AuthenticateFail = "[Auth] Fail",
  Logout = "[Auth] Logout",
  OffLoad = "[Auth] OffLoad"
}

export const offLoad = createAction(AuthActionTypes.OffLoad);

export const auth = createAction(AuthActionTypes.Authenticate,
  props<{ username: string, password: string }>());

export const authSuccess = createAction(
    AuthActionTypes.AuthenticateSuccess,
  props<{ data: any }>()
);

export const authFail = createAction(
    AuthActionTypes.AuthenticateFail,
  props<{ error: Error | any }>()
);

export const logout = createAction(
  AuthActionTypes.Logout
);



export const fromAuthActions = {
  offLoad,
  auth,
  authFail,
  authSuccess,
  logout
};

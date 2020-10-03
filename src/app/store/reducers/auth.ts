import { createReducer, on, Action } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { AuthActions } from "../actions";

export const ENTITY_FEATURE_KEY = "auth";

export interface State extends EntityState<any> {
  loaded: boolean;
  error?: Error | any;
  token: string,
  user:any
}



export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  // In this case this would be optional since primary key is id
  selectId: item => 1
});

export interface AuthPartialState {
  readonly [ENTITY_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
  loaded: false,
  error: null,
  token:null,
  user: null
});

/*const initialState = {
  loaded: false,
  error: null,
  tokenapi:null,
  user: null
}*/

const _reducer = createReducer(
  initialState,
  on(AuthActions.authSuccess, (state, { data }) => {
    
    console.log("data in reducer",data)

    //localStorage.setItem("auth_token",data.access_token)

    /*return adapter.setOne(data, {
      ...state,
      token:data.token,
      user:data.user,
      loaded: true
    });*/
    return {
      ...state,
      tokenapi:data.token,
      user:data.user,
      loaded: true
    };
  }),
  on(AuthActions.authFail, (state, { error }) => {
    console.log("auth error",error)
    return {
      ...state,
      error
    };
  }),
  on(AuthActions.logout, (state, { }) => {
    return {
      ...state,
      loaded: false,
      error: null,
      tokenapi:null,
      user: null
    };
  }),
  on(AuthActions.offLoad, (state) => {    
    console.log("offload")
    return{
      ...state,
      loaded:false,
      error:null 
    } 
  })
 
);

export function reducer(state: any | undefined, action: Action) {
  return _reducer(state, action);
}

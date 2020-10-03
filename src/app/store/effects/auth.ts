import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";

import { AuthActions } from "../actions";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class EntityEffects {  


  authUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.auth),
      switchMap((any) =>
        this.entityService.authenticate(any["username"],any["password"]).pipe(
          map((res: any) =>{
            //console.log("auth success")
            return  AuthActions.authSuccess({
                data:res
              })
            }           
          ),
          catchError(error =>{
            //console.log("catch error")
            return  of(
                AuthActions.authFail({
                  error
                })
              )
            }            
          )
        )
      )
    ),
    { dispatch: true }
  );


  constructor(
    private actions$: Actions,
    private entityService: AuthService
  ) {}
}

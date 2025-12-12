import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import * as fromAUth from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from "rxjs";


@Injectable()

export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);


    // registerUser
    registerUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromAUth.registerUser),
            exhaustMap(action =>
                this.authService.register(action.credentials).pipe(
                    map(user => fromAUth.registerSuccess({user})),
                    catchError(error => of(fromAUth.registerFailure({error})))
                )
            )
        )
    );

    // register success
    registerSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromAUth.registerSuccess),
            tap(() => {
                alert('Registration success. Please login');
                this.router.navigate(['/login'])
            })
        ), {dispatch: false}
    );


    // login
    loginUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromAUth.loginUser),
            exhaustMap(action =>
                this.authService.login(action.credentials).pipe(
                    map(authResponse => fromAUth.loginSuccess({authResponse})),
                    catchError(error => of(fromAUth.loginFailure({error})))
                )
            )
        )
    );

    // login success
    loginSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromAUth.loginSuccess),
            tap(() => {                
                this.router.navigate(['/todos'])
            })
        ), {dispatch: false}
    );

    //logout
    logoutUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromAUth.logoutUser),
            tap(() => {                
                this.router.navigate(['/login'])
            })
        ), {dispatch: false}
    );


}
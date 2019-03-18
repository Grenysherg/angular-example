import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';

import * as AuthActions from './auth.actions';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {from} from 'rxjs';
import * as firebase from 'firebase';
import 'rxjs';
import {Action} from '@ngrx/store';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SIGNUP),
      map((action: AuthActions.TrySignup) => {
        return action.payload;
      }),
      switchMap((authData: { email: string, password: string }) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/']);

        return [
          {
            type: AuthActions.SIGNUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  @Effect()
  authSignin = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySignin) => {
      return action.payload;
    }),
    switchMap((authData: { email: string, password: string }) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(['/']);

      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect()
  authLogout = this.actions$.pipe(
    ofType(AuthActions.TRY_LOGOUT),
    switchMap(() => {
      return from(firebase.auth().signOut());
    }),
    map(() => {
      this.router.navigate(['/']);

      return {
        type: AuthActions.LOGOUT
      };
    })
  );

  constructor(private actions$: Actions<Action>, private router: Router) {}
}

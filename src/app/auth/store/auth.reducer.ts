import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  isAuthenticated: boolean;
}

const initialState: State = {
  token: null,
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNUP):

    case (AuthActions.SIGNIN):
      return {
        ...state,
        isAuthenticated: true
      };

    case (AuthActions.LOGOUT):
      console.log('logout');
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };

    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };

    default:
      return state;
  }
}

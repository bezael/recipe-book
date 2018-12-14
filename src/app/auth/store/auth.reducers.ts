import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: localStorage.getItem('token') || null,
  authenticated: localStorage.getItem('token') ? true : false
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SIGNUP:
    case AuthActions.SIGNIN:
      return {
        ...state,
        authenticated: true
      };
    case AuthActions.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case AuthActions.SET_TOKEN:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        authenticated: true
      };
    default:
      return state;
  }
}

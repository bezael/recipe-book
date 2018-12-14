import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  userId: string;
}

const initialState: State = {
  token: localStorage.getItem('token') || null,
  authenticated: localStorage.getItem('token') ? true : false,
  userId: localStorage.getItem('userId')
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
        authenticated: true,
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId')
      };
    case AuthActions.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      return {
        ...state,
        token: null,
        authenticated: false,
        userId: null
      };
    case AuthActions.SET_TOKEN:
      console.log("setting token " + action.payload);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload.id);

      return {
        ...state,
        authenticated: true,
        token: localStorage.getItem('token'),
        userId: action.payload.id
      };
    default:
      return state;
  }
}

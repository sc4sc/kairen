export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export function authLoginRequest(username, isAdmin, onSuccess, onFailed) {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload: {
      username,
      isAdmin,
      onSuccess,
      onFailed,
    },
  };
}
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED';
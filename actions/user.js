export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export function authLoginRequest(ssoToken, onSuccess, onFailed) {
  return {
    type: USER_LOGIN_REQUEST,
    payload: {
      ssoToken,
      onSuccess,
      onFailed,
    },
  }
}
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export function authLoginSuccess(result) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: result,
  }
}
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

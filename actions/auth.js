export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export function authLoginRequest(ssoToken, isAdmin, onSuccess, onFailed) {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload: {
      ssoToken,
      isAdmin,
      onSuccess,
      onFailed,
    },
  };
}
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED';

export const AUTH_TOGGLE_SECURE_TEAM = 'AUTH_TOGGLE_SECURE_TEAM';
export function authToggleSecureTeam() {
  return {
    type: AUTH_TOGGLE_SECURE_TEAM,
  };
}

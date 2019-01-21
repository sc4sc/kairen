import produce from 'immer';
import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_TOGGLE_SECURE_TEAM,
} from '../actions/auth';

const defaultState = {
  loginInProgress: false,
  user: {},
  deviceToken: '',
  isSecureTeam: true,
  pushToken: '',
};

export default (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_LOGIN_REQUEST: {
        draft.loginInProgress = true;
        return;
      }
      case AUTH_LOGIN_SUCCESS: {
        draft.user = action.payload;
        draft.loginInProgress = false;
        return;
      }
      case AUTH_LOGIN_FAILED: {
        draft.loginInProgress = false;
        return;
      }
      case AUTH_TOGGLE_SECURE_TEAM: {
        draft.isSecureTeam = !draft.isSecureTeam;
      }
      default:
        return;
    }
  });

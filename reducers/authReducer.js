import produce from 'immer';
import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from '../actions/auth';

const defaultState = {
  loginInProgress: false,
  user: {},
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
      default:
        return;
    }
  });

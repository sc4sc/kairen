import { produce } from 'immer';
import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from '../actions/auth';

const defaultState = {
  loginInProgress: false,
  pushToken: '',
  user: {},
};

export default (state = defaultState, action) =>
  produce(state, draftState => {
    const draft = draftState;

    switch (action.type) {
      case AUTH_LOGIN_REQUEST: {
        draft.loginInProgress = true;
        break;
      }
      case AUTH_LOGIN_SUCCESS: {
        draft.user = action.payload;
        draft.loginInProgress = false;
        console.log(draft);
        break;
      }
      case AUTH_LOGIN_FAILED: {
        draft.loginInProgress = false;
        break;
      }
      default:
        return;
    }
  });

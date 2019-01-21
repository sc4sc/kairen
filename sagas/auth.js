import { call, put, takeLatest } from 'redux-saga/effects';
import * as apis from '../apis';
import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from '../actions/auth';

function* authLogin(action) {
  const { username, isAdmin, onSuccess, onFailed } = action.payload;
  try {
    const result = yield call(apis.requestAuthentication, username, isAdmin);

    if (result.error) {
      throw result.data;
    }

    yield put({ type: AUTH_LOGIN_SUCCESS, payload: result.data });
    yield call(onSuccess);
  } catch (error) {
    yield put({ type: AUTH_LOGIN_FAILED, payload: error, error: true });
    yield call(onFailed);
    return;
  }
}

export function* watchAuthLoginRequest() {
  yield takeLatest(AUTH_LOGIN_REQUEST, authLogin);
}

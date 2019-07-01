import { call, put, spawn, takeLatest } from 'redux-saga/effects';
const { SecureStore } = Expo;

import * as apis from '../apis';

import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  authLoginSuccess,
} from '../actions/auth';
import { getPushToken } from '../utils';

function* storeToken(token) {
  yield call(SecureStore.setItemAsync, 'appToken', token);
}

function* authLogin(action) {
  const { ssoToken, onSuccess, onFailed } = action.payload;
  try {
    const pushToken = yield call(getPushToken);

    console.log('Push Token:', pushToken);

    const result = yield call(apis.requestAuthentication, ssoToken, pushToken);
    if (result.error) {
      throw result;
    }

    const appToken = result.appToken;

    yield call(apis.setAppToken, appToken);
    // Won't care even though storing token fails
    yield spawn(storeToken, appToken);

    yield put(authLoginSuccess(result));
    yield call(onSuccess);
  } catch (error) {
    console.log('Login Error', error);
    yield put({ type: AUTH_LOGIN_FAILED, payload: error, error: true });
    yield call(onFailed);
    return;
  }
}

export function* watchAuthLoginRequest() {
  yield takeLatest(AUTH_LOGIN_REQUEST, authLogin);
}

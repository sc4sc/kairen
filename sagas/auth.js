import { call, put, takeLatest } from 'redux-saga/effects';
import { Permissions, Notifications } from 'expo';

import * as apis from '../apis';

import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from '../actions/auth';
import { requestPermission } from '../utils';

function* getPushToken() {
  let pushToken = '';

  try {
    if (yield call(requestPermission, Permissions.NOTIFICATIONS)) {
      pushToken = yield call(Notifications.getExpoPushTokenAsync);
    }
  } catch (error) {
    console.log('getPushToken Error:', error);
  }

  return pushToken;
}

function* authLogin(action) {
  const { ssoToken, isAdmin, onSuccess, onFailed } = action.payload;
  try {
    const pushToken = yield call(getPushToken);

    console.log('Push Token:', pushToken);

    const result = yield call(
      apis.requestAuthentication,
      ssoToken,
      isAdmin,
      pushToken
    );

    if (result.error) {
      throw result;
    }

    call(apis.setAppToken, `JWT ${result.appToken}`);

    yield put({ type: AUTH_LOGIN_SUCCESS, payload: result });
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

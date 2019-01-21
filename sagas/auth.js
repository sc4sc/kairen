import { call, put, takeLatest } from 'redux-saga/effects';
import { Permissions, Notifications } from 'expo';

import * as apis from '../apis';

import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from '../actions/auth';

function* getPushToken() {
  let pushToken = '',
    finalStatus = '';
  const { status: existingStatus } = yield call(
    Permissions.getAsync,
    Permissions.NOTIFICATIONS
  );

  if (existingStatus !== 'granted') {
    finalStatus = yield call(Permissions.askAsync, Permissions.NOTIFICATIONS);
  } else {
    finalStatus = existingStatus;
  }
  if (finalStatus === 'granted') {
    pushToken = yield call(Notifications.getExpoPushTokenAsync);
  }

  return pushToken;
}

function* authLogin(action) {
  const { username, isAdmin, onSuccess, onFailed } = action.payload;
  try {
    const pushToken = yield call(getPushToken);

    console.log('Push Token:', pushToken);

    const result = yield call(
      apis.requestAuthentication,
      username,
      isAdmin,
      pushToken
    );

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

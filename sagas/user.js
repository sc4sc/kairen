import { call, put, spawn, takeLatest } from 'redux-saga/effects'
import * as SecureStore from 'expo-secure-store'
import * as apis from '../apis'
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_CHANGE_MODE,
  userLoginSuccess,
  userChangeMode,
} from '../actions/user'
import { getPushToken } from '../utils'

function* storeToken(token) {
  yield call(SecureStore.setItemAsync, 'appToken', token)
}

function* requestChangeMode(action) {
  const value = action.payload

  yield call(apis.changeMode, value)
  yield put(userChangeMode(value))
}

function* userLogin(action) {
  const { ssoToken, onSuccess, onFailed } = action.payload
  try {
    const pushToken = yield call(getPushToken)

    console.log('Push Token:', pushToken)

    const result = yield call(apis.requestAuthentication, ssoToken, pushToken)
    if (result.error) {
      throw result
    }

    const appToken = result.appToken

    yield call(apis.setAppToken, appToken)
    yield spawn(storeToken, appToken)

    yield put(userLoginSuccess(result))
    yield call(onSuccess)
  } catch (error) {
    console.log('Login Error', error)
    yield put({ type: USER_LOGIN_FAILED, payload: error, error: true })
    yield call(onFailed)
    return
  }
}

export function* watchUserLoginRequest() {
  yield takeLatest(USER_LOGIN_REQUEST, userLogin)
}

export function* watchUserChangeMode() {
  yield takeLatest(USER_CHANGE_MODE, requestChangeMode)
}

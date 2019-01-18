import { all, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as apis from '../apis';

export function* helloSaga() {
  yield takeEvery('*', function*() {
    console.log('hello! saga is running right now');
  });
}

export function* listIncidents() {
  yield call(apis.listIncidents);
}

export function* watchListIncidents() {
  yield takeEvery('LIST_INCIDENTS_REQUESTED', listIncidents);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchListIncidents()]);
}

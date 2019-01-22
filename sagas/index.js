import { all, takeEvery } from 'redux-saga/effects';
import { watchLoadMoreIncidents } from './incidentsList';
import { watchAuthLoginRequest } from './auth';

// This is just an example
export function* helloSaga() {
  yield takeEvery('*', function*() {
    // console.log("hello! I'll show up every time actions are dispatched");
  });
}

export default function* rootSaga() {
  yield all([helloSaga(), watchLoadMoreIncidents(), watchAuthLoginRequest()]);
}

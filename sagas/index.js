import { all, takeEvery } from 'redux-saga/effects'
import incidentsListSaga from './incidentsList'
import { watchUserLoginRequest } from './user'
import { watchPostNewIncident } from './newIncident'

// This is just an example
export function* helloSaga() {
  yield takeEvery('*', function*() {
    // console.log("hello! I'll show up every time actions are dispatched");
  })
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    incidentsListSaga(),
    watchUserLoginRequest(),
    watchPostNewIncident(),
  ])
}

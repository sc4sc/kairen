import { all, takeEvery } from 'redux-saga/effects'
import incidentsListSaga from './incidentsList'
import { watchUserLoginRequest, watchUserChangeMode } from './user'
import { watchPostNewIncident } from './newIncident'

export default function* rootSaga() {
  yield all([
    incidentsListSaga(),
    watchUserLoginRequest(),
    watchUserChangeMode(),
    watchPostNewIncident(),
  ])
}

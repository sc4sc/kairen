import {
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import {
  INCIDENTS_LIST_APPEND,
  INCIDENTS_LIST_LOAD_MORE,
  INCIDENTS_LIST_RESET,
  incidentsListAppend,
  incidentsListLoadFailed,
  incidentsListLoadRequested,
  incidentsListLoadSuccess,
} from '../actions/incidentsList';
import * as apis from '../apis';

export function* loadMoreIncidents() {
  const { listEnded, readUntil } = (yield select()).incidentsList;
  if (listEnded) {
    return;
  }

  const appending = yield fork(function* load() {
    yield put(incidentsListLoadRequested());

    let nextIncidents = [];
    try {
      nextIncidents = yield call(apis.listIncidents, {
        before: readUntil,
        size: 100,
      });
      yield put(incidentsListLoadSuccess());
    } catch (error) {
      yield put(incidentsListLoadFailed(error));
    }

    // indicates the end of a task
    yield put(incidentsListAppend(nextIncidents));
  });

  // it should stop appending when reset
  // only one atomic operation is permitted, which is appending or resetting
  const action = yield take([INCIDENTS_LIST_APPEND, INCIDENTS_LIST_RESET]);
  if (action.type === INCIDENTS_LIST_RESET) {
    cancel(appending);
  }
}

export function* watchLoadMoreIncidents() {
  // prevent an inconsistent state
  yield takeLatest(INCIDENTS_LIST_LOAD_MORE, loadMoreIncidents);
}
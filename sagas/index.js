import {
  all,
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import * as apis from '../apis';
import {
  INCIDENTS_LIST_APPEND,
  INCIDENTS_LIST_LOAD_MORE,
  INCIDENTS_LIST_RESET,
  incidentsListAppend,
  incidentsListLoadFailed,
  incidentsListLoadRequested,
  incidentsListLoadSuccess,
} from '../actions/incidentsList';

// This is just an example
export function* helloSaga() {
  yield takeEvery('*', function*() {
    console.log("hello! I'll show up every time actions are dispatched");
  });
}

export function* loadMoreIncidents() {
  const { listEnded, readUntil } = (yield select()).incidentsList;
  if (listEnded) {
    return;
  }

  const appending = fork(function* load() {
    yield put(incidentsListLoadRequested());

    let nextIncidents = [];
    try {
      nextIncidents = yield call(
        apis.listIncidents({ before: readUntil, size: 100 })
      );
      yield put(incidentsListLoadSuccess());
    } catch (error) {
      yield put(incidentsListLoadFailed());
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

export default function* rootSaga() {
  yield all([helloSaga(), watchLoadMoreIncidents()]);
}

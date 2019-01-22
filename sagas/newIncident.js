import { Alert } from 'react-native';

import {
  NEW_INCIDENT_POST_REQUESTED,
  newIncidentPostFailed,
  newIncidentPostSuccess,
} from '../actions/newIncident';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as apis from '../apis';

export function* postNewIncident(action) {
  try {
    const userId = (yield select()).auth.user.username;
    const result = yield call(apis.postIncident, { ...action.payload, userId });

    yield put(newIncidentPostSuccess());

    if (action.onSuccess) {
      yield call(action.onSuccess);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Response) {
      Alert.alert('Posting failed', 'server returned error ' + error.status);
    } else {
      Alert.alert(
        'Unknown Error',
        'It is likely due to network. Please try again.'
      );
    }
    yield put(newIncidentPostFailed());
    if (action.onFailed) {
      yield call(action.onFailed, error);
    }
  }
}

export function* watchPostNewIncident() {
  yield takeLatest(NEW_INCIDENT_POST_REQUESTED, postNewIncident);
}

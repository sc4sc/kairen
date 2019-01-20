import produce from 'immer';
import {
  INCIDENTS_LIST_APPEND,
  INCIDENTS_LIST_ENDED,
  INCIDENTS_LIST_LOAD_FAILED,
  INCIDENTS_LIST_LOAD_REQUESTED,
  INCIDENTS_LIST_LOAD_SUCCESS,
  INCIDENTS_LIST_RESET,
} from '../actions/incidentsList';

const defaultState = {
  byId: {},
  idList: [],
  readUntil: '',
  listEnded: false,
  loading: false,
};

export default (state = defaultState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case INCIDENTS_LIST_LOAD_REQUESTED: {
        draft.loading = true;
        return;
      }

      case INCIDENTS_LIST_LOAD_SUCCESS: {
        draft.loading = false;
        return;
      }

      case INCIDENTS_LIST_LOAD_FAILED: {
        draft.loading = false;
        return;
      }

      case INCIDENTS_LIST_APPEND: {
        const incidents = action.payload;

        if (incidents.length === 0) {
          draft.listEnded = true;
          return;
        }

        incidents.forEach(incident => {
          draft.byId[incident.id] = incident;
        });

        draft.idList = draft.idList.concat(
          incidents.map(incident => incident.id)
        );

        draft.readUntil = incidents[incidents.length - 1].createdAt;
        return;
      }

      case INCIDENTS_LIST_RESET: {
        return defaultState;
      }
    }
  });
};

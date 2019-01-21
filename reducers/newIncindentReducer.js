import produce from 'immer';
import {
  NEW_INCIDENT_CHANGE_STAGE,
  NEW_INCIDENT_RESET,
  NEW_INCIDENT_TYPE_SELECT,
} from '../actions';

const defaultState = {
  incidentList: [
    { type: '가스유출' },
    { type: '화재' },
    { type: '독극물' },
    { type: '폭발' },
  ],
  selectedIncident: null,
  isFirstStage: true,

  query: '한국과학기술원 N1 404',
  map: {
    lat: 36.374159,
    lng: 127.365864,
  },
};

export default (state = defaultState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'incident_list': {
        return;
      }

      case NEW_INCIDENT_RESET: {
        draft.isFirstStage = true;
        draft.selectedIncident = null;
      }

      case NEW_INCIDENT_TYPE_SELECT: {
        draft.selectedIncident = action.payload;
        return;
      }

      case NEW_INCIDENT_CHANGE_STAGE: {
        draft.isFirstStage = !draft.isFirstStage;
      }

      default:
        return;
    }
  });
};

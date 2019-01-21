import produce from 'immer';

const defaultState = {
  incidentList: [
    { type: '가스유출' },
    { type: '화재' },
    { type: '독극물' },
    { type: '폭발' },
  ],
  selectedIncident: null,
  isFirstStage: true,
};

export default (state = defaultState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'incident_list': {
        return;
      }

      case 'incident_select': {
        draft.selectedIncident = action.payload;
        return;
      }

      case 'stage_change': {
        draft.isFirstStage = !draft.isFirstStage;
      }
      default:
        return;
    }
  });
};

import produce from 'immer';

const defaultState = {
  incidentList = [],
  selectedIncident = null
};

export default (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'incident_list': {
        draft.incidentList = ["가스유출", "화재", "독극물", "폭발"];
      }

      case 'incident_select': {
        draft.selectedIncident = action.payload;
      }
    }
  })

};

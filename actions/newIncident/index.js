export const NEW_INCIDENT_POST_REQUESTED = 'NEW_INCIDENT_POST_REQUESTED';
export function newIncidentPostRequested(payload, onSuccess, onFailed) {
  return {
    type: NEW_INCIDENT_POST_REQUESTED,
    payload,
    onSuccess,
    onFailed,
  };
}

export const NEW_INCIDENT_POST_SUCCESS = 'NEW_INCIDNET_POST_SUCCESS';
export function newIncidentPostSuccess() {
  return {
    type: NEW_INCIDENT_POST_SUCCESS,
  };
}

export const NEW_INCIDENT_POST_FAILED = 'NEW_INCIDENT_POST_FAILED';
export function newIncidentPostFailed() {
  return {
    type: NEW_INCIDENT_POST_FAILED,
  };
}

export const NEW_INCIDENT_TYPE_SELECT = 'NEW_INCIDENT_TYPE_SELECT';
export const selectIncident = incidentType => ({
  type: NEW_INCIDENT_TYPE_SELECT,
  payload: incidentType,
});

export const NEW_INCIDENT_RESET = 'NEW_INCIDENT_RESET';
export const resetSelection = () => ({
  type: NEW_INCIDENT_RESET,
});

export const NEW_INCIDENT_CHANGE_STAGE = 'NEW_INCIDENT_CHANGE_STAGE';
export const changeStage = () => ({
  type: NEW_INCIDENT_CHANGE_STAGE,
});

export const NEW_INCIDENT_TOGGLE_VISIBILITY = 'NEW_INCIDENT_TOGGLE_VISIBILITY';
export const toggleVisibility = () => ({
  type: NEW_INCIDENT_TOGGLE_VISIBILITY,
});

export const NEW_INCIDENT_RECORD_POSITION = 'NEW_INCIDENT_RECORD_POSITION';
export const recordPosition = oldPosition => ({
    type: NEW_INCIDENT_RECORD_POSITION,
    payload: oldPosition,
  });

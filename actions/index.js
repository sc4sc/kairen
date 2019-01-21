export function sayHello(message) {
  return {
    type: 'SAY_HELLO',
    payload: {
      message,
    },
  };
}

export const NEW_INCIDENT_TYPE_SELECT = 'NEW_INCIDENT_TYPE_SELECT';
export const selectIncident = incidentType => {
  return {
    type: NEW_INCIDENT_TYPE_SELECT,
    payload: incidentType,
  };
};

export const NEW_INCIDENT_RESET = 'NEW_INCIDENT_RESET';
export const resetSelection = () => {
  return {
    type: NEW_INCIDENT_RESET,
  };
};

export const NEW_INCIDENT_CHANGE_STAGE = 'NEW_INCIDENT_CHANGE_STAGE';
export const changeStage = () => {
  return {
    type: NEW_INCIDENT_CHANGE_STAGE,
  };
};

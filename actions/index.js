export function sayHello(message) {
  return {
    type: 'SAY_HELLO',
    payload: {
      message,
    },
  };
}

export const selectIncident = incidentType => {
  return {
    type: 'incident_select',
    payload: incidentType,
  };
};

export const resetSelection = () => {
  return {
    type: 'incident_select',
    payload: null,
  };
};

export const changeStage = () => {
  return {
    type: 'stage_change',
  };
};

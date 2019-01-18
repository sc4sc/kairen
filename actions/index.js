export function sayHello(message) {
  return {
    type: 'SAY_HELLO',
    payload: {
      message,
    },
  };
}

export const LIST_INCIDENTS_REQUESTED = 'LIST_INCIDENTS_REQUESTED';
export function requestListIncidents() {
  return {
    type: LIST_INCIDENTS_REQUESTED
  }
}

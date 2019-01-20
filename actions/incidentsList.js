export const INCIDENTS_LIST_LOAD_REQUESTED = 'INCIDENTS_LIST_LOAD_REQUESTED';
export function incidentsListLoadRequested() {
  return { type: INCIDENTS_LIST_LOAD_REQUESTED };
}

export const INCIDENTS_LIST_LOAD_SUCCESS = 'INCIDENTS_LIST_LOAD_SUCCESS';
export function incidentsListLoadSuccess() {
  return { type: INCIDENTS_LIST_LOAD_SUCCESS };
}

export const INCIDENTS_LIST_LOAD_FAILED = 'INCIDENTS_LIST_LOAD_FAILED';
export function incidentsListLoadFailed(error) {
  return { type: INCIDENTS_LIST_LOAD_FAILED, payload: error, error: true };
}

export const INCIDENTS_LIST_RESET = 'INCIDENTS_LIST_RESET';
export const INCIDENTS_LIST_LOAD_MORE = 'INCIDENTS_LIST_LOAD_MORE';
export const INCIDENTS_LIST_APPEND = 'INCIDENTS_LIST_APPEND';
export function incidentsListAppend(incidents) {
  return { type: INCIDENTS_LIST_APPEND, payload: incidents };
}

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
export function incidentsListReset() {
  return {
    type: INCIDENTS_LIST_RESET,
  };
}
export const INCIDENTS_LIST_LOAD_MORE = 'INCIDENTS_LIST_LOAD_MORE';
export function incidentsListLoadMore() {
  return {
    type: INCIDENTS_LIST_LOAD_MORE,
  };
}

export const INCIDENTS_LIST_REFRESH = 'INCIDENTS_LIST_REFRESH';
export function incidentsListRefresh() {
  return {
    type: INCIDENTS_LIST_REFRESH,
  };
}

export const INCIDENTS_LIST_SELECT = 'INCIDENTS_LIST_SELECT';
export function incidentsListSelect(index) {
  return {
    type: INCIDENTS_LIST_SELECT,
    payload: {
      index,
    },
  };
}

export const INCIDENTS_LIST_APPEND = 'INCIDENTS_LIST_APPEND';
export function incidentsListAppend(incidents) {
  return { type: INCIDENTS_LIST_APPEND, payload: incidents };
}

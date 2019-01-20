import produce from 'immer';

const defaultState = {
  byId: {},
  loadFrom: null,
  listIds: [],
};

export default (state = defaultState, action) => {
  produce(() => {
    [];
  });
  return state;
};

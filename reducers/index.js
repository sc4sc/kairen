import { combineReducers } from 'redux';
import incidentsReducer from './incidentsListReducer';

export default combineReducers({
  incidentsList: incidentsReducer,
});

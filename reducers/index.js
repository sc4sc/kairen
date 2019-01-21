import { combineReducers } from 'redux';
import incidentsListReducer from './incidentsListReducer';

export default combineReducers({
  incidentsList: incidentsListReducer,
});

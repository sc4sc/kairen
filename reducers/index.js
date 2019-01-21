import { combineReducers } from 'redux';
import incidentsListReducer from './incidentsListReducer';
import authReducer from './authReducer';

export default combineReducers({
  incidentsList: incidentsListReducer,
  auth: authReducer,
});

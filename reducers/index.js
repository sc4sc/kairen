import { combineReducers } from 'redux';
import incidentsReducer from './incidentsListReducer';
import newIncidentReducer from './newIncindentReducer';

export default combineReducers({
  incidentsList: incidentsReducer,
  newIncident: newIncidentReducer,
});

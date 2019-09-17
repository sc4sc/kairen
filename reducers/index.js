import { combineReducers } from 'redux'
import userReducer from './userReducer'
import incidentsListReducer from './incidentsListReducer'
import newIncidentReducer from './newIncindentReducer'

export default combineReducers({
  incidentsList: incidentsListReducer,
  newIncident: newIncidentReducer,
  user: userReducer,
})

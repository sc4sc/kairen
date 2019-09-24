import { combineReducers } from 'redux'
import incidentsListReducer from './incidentsListReducer'
import newIncidentReducer from './newIncindentReducer'

import authReducer from './authReducer'

export default combineReducers({
  incidentsList: incidentsListReducer,
  newIncident: newIncidentReducer,
  auth: authReducer,
})

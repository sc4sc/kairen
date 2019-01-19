import { combineReducers } from 'redux';
import incidentsReducer from './incidentsReducer';

export default combineReducers({
  incidents: incidentsReducer,
});

import { combineReducers } from 'redux';
import groups from './groupsReducer';
import UI from './UIReducer';

export default combineReducers({
  groups: groups,
  UI: UI
});
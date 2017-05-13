import { combineReducers } from 'redux';
import languageReducer from './Language';
import targetsReducer from './Targets';
import userTonesReducer from './UserTone';

const rootReducer = combineReducers({
  language: languageReducer,
  allTargets: targetsReducer,
  userTones: userTonesReducer
});

export default rootReducer;

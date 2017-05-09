import { combineReducers } from 'redux';
import languageReducer from './Language';
import targetsReducer from './Targets';

const rootReducer = combineReducers({
  language: languageReducer,
  targets: targetsReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import languageReducer from './Language';
import targetsReducer from './Targets';
import modalsReducer from './Modals';

const rootReducer = combineReducers({
  language: languageReducer,
  allTargets: targetsReducer,
  modalVisible: modalsReducer
});

export default rootReducer;

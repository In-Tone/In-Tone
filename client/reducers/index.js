import { combineReducers } from 'redux';
import languageReducer from './Language';
import targetsReducer from './Targets';
import userTonesReducer from './UserTone';
import userReducer from './Auth';
import currentTargetReducer from './CurrentTarget';
import audioURLReducer from './UserAudioURL';
import setToneTypesReducer from './ToneTypes';

const rootReducer = combineReducers({
  language: languageReducer,
  allTargets: targetsReducer,
  userTones: userTonesReducer,
  user: userReducer,
  currentTarget: currentTargetReducer,
  url: audioURLReducer,
  toneTypes: setToneTypesReducer
});

export default rootReducer;

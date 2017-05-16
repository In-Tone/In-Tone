import { combineReducers } from 'redux';
import languageReducer from './Language';
import targetsReducer from './Targets';
import userTonesReducer from './UserTone';
import userReducer from './Auth';
import audioURLReducer from './UserAudioURL';
import UserGraphReducer from './UserGraph';


const rootReducer = combineReducers({
  language: languageReducer,
  allTargets: targetsReducer,
  userTones: userTonesReducer,
  user: userReducer,
  url: audioURLReducer,
  userGraph: UserGraphReducer
});

export default rootReducer;

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}),
      thunkMiddleware
    )
  )
)

export default store

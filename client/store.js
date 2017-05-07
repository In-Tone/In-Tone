import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  reducers,
  applyMiddleware(
    createLogger(),
    thunkMiddleware
  )
);

export default store;
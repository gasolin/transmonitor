import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import {createEpicMiddleware} from 'redux-observable';
import {rootEpic} from './epics';

export function configureStore() {
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware)
    )
  );
}

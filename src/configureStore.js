import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers'
import {createEpicMiddleware} from 'redux-observable'
import {rootEpic} from './epics'
import {
  getBlock$,
  getBlockNumber$,
  watchBlocks$
} from './epics/web3wrap'

export function configureStore (deps = {}) {
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
      getBlock$,
      getBlockNumber$,
      watchBlocks$,
      ...deps
    }
  })

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware)
    )
  )
}

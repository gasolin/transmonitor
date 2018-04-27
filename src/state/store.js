import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import {createEpicMiddleware} from 'redux-observable'
import {rootEpic} from './blocks/epics'
import {
  getBlock$,
  getBlockNumber$,
  watchBlocks$
} from './blocks/epics/web3wrap'

function configureStore (deps = {}) {
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

const store = configureStore()

export {
  configureStore,
  store
}

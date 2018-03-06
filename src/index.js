import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './App'
import {Provider} from 'react-redux'
// import registerServiceWorker from './registerServiceWorker';
import {configureStore} from './configureStore'
import {
  quicklyGetBlock,
  watchBlocks,
  warnWeb3Connection
} from './actions'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
// registerServiceWorker();

window.addEventListener('load', () => {
  if (typeof window.web3 === 'undefined') {
    store.dispatch(warnWeb3Connection(true))
  } else {
    store.dispatch(warnWeb3Connection(false))
    // console.log(window.web3.currentProvider.isMetaMask)
    store.dispatch(quicklyGetBlock())
    store.dispatch(watchBlocks())
  }
})

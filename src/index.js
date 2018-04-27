import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
// import registerServiceWorker from './registerServiceWorker';
import { store } from './state/store'
import {
  quicklyGetBlock,
  watchBlocks
} from './state/blocks/actions'
import { updateWeb3Status } from './state/web3/actions'
import Web3 from 'web3'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
// registerServiceWorker();

window.addEventListener('load', () => {
  let hasWeb3 = typeof window.web3 !== 'undefined'
  if (hasWeb3) {
    store.dispatch(updateWeb3Status(new Web3(window.web3.currentProvider)))
    // console.log(window.web3.currentProvider.isMetaMask)
    store.dispatch(quicklyGetBlock())
    store.dispatch(watchBlocks())
  } else {
    store.dispatch(updateWeb3Status(null))
  }
})

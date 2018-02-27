import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import {configureStore} from './configureStore';
import {getBlocks} from './actions';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();

window.addEventListener("load", () => {
  store.dispatch(getBlocks());
});

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
import {Provider} from 'react-redux';
// import registerServiceWorker from './registerServiceWorker';
import {configureStore} from './configureStore';
import {watchBlocks} from './actions';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>
  , document.getElementById('root'));
// registerServiceWorker();

window.addEventListener("load", () => {
  store.dispatch(watchBlocks());
});

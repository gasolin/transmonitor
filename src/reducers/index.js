import {combineReducers} from 'redux';
import {blockReducer} from './blocks';
import {transactionReducer} from './transactions';

export default combineReducers({
  blocks: blockReducer,
  transactions: transactionReducer,
});

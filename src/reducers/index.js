import {combineReducers} from 'redux';
import {blockReducer} from './blocks';

export default combineReducers({
  blocks: blockReducer,
});

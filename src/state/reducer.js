import { combineReducers } from 'redux'
import { web3Reducer } from './web3/reducers'
import { blockReducer } from './blocks/reducers'

export default combineReducers({
  blocks: blockReducer,
  web3: web3Reducer
})

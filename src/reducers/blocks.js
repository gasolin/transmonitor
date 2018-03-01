import {BigNumber} from 'bignumber.js';
import {
  GET_BLOCKS,
  SAVE_BLOCK,
  SELECT_BLOCK,
} from "../actions";

const initialState = {
  latestBlock: null,
  selectedBlock: null,
  loading: false,
  blocks: [],
};

export function blockReducer(state = initialState, action) {
  switch(action.type) {
    case GET_BLOCKS:
      return {
        ...state,
        loading: true,
      }
    case SAVE_BLOCK:
      let number = action.payload.number;
      let timestamp = action.payload.timestamp;
      let latestBlock = state.latestBlock < number ?
        number : state.latestBlock;
      let totalTransactionsLength = action.payload.transactions.length;
      // only save transaction with value
      let valueTransactions = action.payload.transactions.filter(transaction => {
        let value = new BigNumber(transaction.value);
        return !value.isZero();
      });
      let blocks;

      let idx = state.blocks.findIndex(block => block.number === number);
      if (idx > -1) { // update
        blocks = state.blocks.splice(idx, 1, {
          number,
          timestamp,
          totalTransactionsLength,
          valueTransactions,
        });
      } else { // new
        blocks = [...state.blocks, {
          number,
          timestamp,
          totalTransactionsLength,
          valueTransactions,
        }];
      }
      return {
        ...state,
        latestBlock,
        loading: false,
        blocks,
      };
    case SELECT_BLOCK:
      return {
        ...state,
        selectedBlock: action.payload,
      };
    default:
      return state;
  }
}

export default blockReducer;

import {BigNumber} from 'bignumber.js';
import {
  CLEAR_BLOCKS,
  GET_BLOCKS,
  LOAD_BLOCKS,
  SAVE_BLOCK,
} from "../actions";

const initialState = {
  latestBlock: "",
  loading: false,
  blocks: [],
};

// block
// number, gasUsed, timestamp, transactions
const default_blocks = [
  {
    number: 1234567,
  },
  {
    number: 1234566,
  },
  {
    number: 1234565,
  },
  {
    number: 1234564,
  }
];

export function blockReducer(state = initialState, action) {
  switch(action.type) {
    case GET_BLOCKS:
      return {
        ...state,
        loading: true,
      }
    case LOAD_BLOCKS:
      return {
        latestBlock: default_blocks[0].number,
        loading: false,
        blocks: default_blocks,
      };
    case CLEAR_BLOCKS:
      return initialState;
    case SAVE_BLOCK:
      let number = action.payload.number;
      let latestBlock = state.latestBlock < number ?
        number : state.latestBlock;
      let blocks;
      let totalTransactionsLength = action.payload.transactions.length;
      // only save transaction with value
      let valueTransactions = action.payload.transactions.filter(transaction => {
        // transaction.value != "0");
        let num = new BigNumber(transaction.value);
        return num.isZero();
      });
      console.log('valid transactions: ', valueTransactions.length);

      let idx = state.blocks.findIndex(block => block.number === number);
      if (idx > -1) { // update
        blocks = state.blocks.splice(idx, 1, {
          number,
          totalTransactionsLength,
          valueTransactions,
        });
      } else { // new
        blocks = [...state.blocks, {
          number,
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
    default:
      return state;
  }
}

export default blockReducer;

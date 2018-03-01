import {BigNumber} from 'bignumber.js';
import {
  WATCH_BLOCKS,
  SAVE_BLOCK,
  SELECT_BLOCK,
} from "../actions";

const initialState = {
  latestBlock: null,
  selectedBlock: null,
  loading: false,
  blocks: [],
  blocksLimit: 10,
};

export function blockReducer(state = initialState, action) {
  switch(action.type) {
    case WATCH_BLOCKS:
      return {
        ...state,
        loading: true,
      }
    case SAVE_BLOCK:
      const BLOCKS_LIMIT = state.blocksLimit;
      let number = action.payload.number;
      let timestamp = action.payload.timestamp;
      // update latestBlock when there's a block with bigger number
      let latestBlock = state.latestBlock < number ?
        number : state.latestBlock;
      // auto select latestBlock if selectedBlock does not exist
      let selectedBlock = state.selectedBlock ? state.selectedBlock : latestBlock;
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
        // insert new entry from head
        blocks = [{
          number,
          timestamp,
          totalTransactionsLength,
          valueTransactions,
        },
        ...state.blocks];
      }

      // run at first time to stuff mock blocks
      if (blocks.length < BLOCKS_LIMIT) {
        let smallestNumber = blocks[blocks.length - 1].number;
        for (let i = 0; i < BLOCKS_LIMIT - 1; i++) {
          blocks = [...blocks, {
            number: --smallestNumber,
            transactions: [],
          }];
        }
      } else if (blocks.length > BLOCKS_LIMIT) {
        // only show recent 10 blocks + selected block
        let tempSelectedBlock = undefined;
        if (latestBlock - selectedBlock > BLOCKS_LIMIT) {
          let selectedBlockIdx = blocks.findIndex(block => block.number === selectedBlock);
          if (selectedBlockIdx > -1 && selectedBlockIdx > BLOCKS_LIMIT - 1) {
            tempSelectedBlock = blocks[selectedBlockIdx];
          }
        }
        blocks = blocks.slice(0, BLOCKS_LIMIT);
        if (tempSelectedBlock) { // the BLOCKS_LIMIT + 1 block is the selectedBlock
          blocks = [...blocks, tempSelectedBlock];
        }
      }

      return {
        ...state,
        blocks,
        latestBlock,
        loading: false,
        selectedBlock,
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

import {
  CLEAR_BLOCKS,
  LOAD_BLOCKS,
} from "../actions";

const initialState = {
  latestBlock: "preparing...",
  loading: false,
  blocks: [],
};

// block
// number, gasUsed, timestamp, transactions
const default_blocks = [
  {
    number: "1234567",
  },
  {
    number: "1234566",
  },
  {
    number: "1234565",
  },
  {
    number: "1234564",
  }
];

export function blockReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_BLOCKS:
      return {
        latestBlock: default_blocks[0].number,
        loading: false,
        blocks: default_blocks,
      };
    case CLEAR_BLOCKS:
      return initialState;
    default:
      return state;
  }
}

export default blockReducer;

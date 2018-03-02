export const QUICKLY_GET_BLOCK = 'QUICKLY_GET_BLOCK';
export const SAVE_BLOCK = 'SAVE_BLOCK';
export const SELECT_BLOCK = 'SELECT_BLOCK';
export const WATCH_BLOCKS = 'WATCH_BLOCKS';

/**
 * Create an action to get latest blocks.
 */
export function watchBlocks() {
  return {
    type: WATCH_BLOCKS
  }
}

/**
 * Create an action to get latest block.
 */
export function quicklyGetBlock() {
  return {
    type: QUICKLY_GET_BLOCK
  }
}

/**
 * Process and save the block data to store.
 * @param {Object} payload
 */
export function saveBlock(payload) {
  return {
    type: SAVE_BLOCK,
    payload,
  }
}

/**
 * Select block data from store.
 * @param {number} payload
 */
export function selectBlock(payload) {
  return {
    type: SELECT_BLOCK,
    payload,
  }
}

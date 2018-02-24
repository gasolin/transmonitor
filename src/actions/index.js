export const CLEAR_BLOCKS = "CLEAR_BLOCKS";
export const GET_BLOCKS = "GET_BLOCKS";
export const LOAD_BLOCKS = "LOAD_BLOCKS";
export const SAVE_BLOCK = "SAVE_BLOCK";

export function getBlocks() {
  return {
    type: GET_BLOCKS
  }
}

export function saveBlock(payload) {
  return {
    type: SAVE_BLOCK,
    payload,
  }
}

export function loadBlocks() {
  return {
    type: LOAD_BLOCKS
  }
}

export function clear() {
  return {
    type: CLEAR_BLOCKS
  }
}

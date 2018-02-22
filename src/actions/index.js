export const LOAD_BLOCKS = "LOAD_BLOCKS";
export const CLEAR_BLOCKS = "CLEAR_BLOCKS";

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

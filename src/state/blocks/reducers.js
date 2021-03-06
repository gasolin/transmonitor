import {BigNumber} from 'bignumber.js'
import {
  GET_BLOCK,
  QUICKLY_GET_BLOCK,
  SAVE_BLOCK,
  SELECT_BLOCK,
  UPDATE_BLOCK,
  WATCH_BLOCKS
} from './types'
import {BLOCKS_LIMIT} from '../../constants'

const initialState = {
  blocks: [],
  latestBlock: null,
  loading: false,
  selectedBlock: null
}

export function blockReducer (state = initialState, action) {
  switch (action.type) {
    case WATCH_BLOCKS:
      return {
        ...state,
        loading: true
      }
    case SAVE_BLOCK:
      let number = action.payload.number
      let timestamp = action.payload.timestamp
      // update latestBlock when there's a block with bigger number
      let latestBlock = state.latestBlock < number
        ? number : state.latestBlock
      // auto select latestBlock if selectedBlock does not exist
      let selectedBlock = state.selectedBlock ? state.selectedBlock : latestBlock
      let totalTransactionsLength = action.payload.transactions.length
      // only save transaction with value
      let valueTransactions = action.payload.transactions.filter(transaction => {
        let value = new BigNumber(transaction.value)
        return !value.isZero()
      })
      let blocks

      // insert new entry from head
      blocks = [{
        number,
        timestamp,
        totalTransactionsLength,
        valueTransactions
      },
      ...state.blocks]

      // only show recent 10 blocks + selected block
      if (blocks.length > BLOCKS_LIMIT) {
        let tempSelectedBlock
        if (latestBlock - selectedBlock > BLOCKS_LIMIT - 1) {
          let selectedBlockIdx = blocks.findIndex(block => block.number === selectedBlock)
          if (selectedBlockIdx > -1 && selectedBlockIdx > BLOCKS_LIMIT - 1) {
            tempSelectedBlock = blocks[selectedBlockIdx]
          }
        }
        blocks = blocks.slice(0, BLOCKS_LIMIT)
        if (tempSelectedBlock) { // the BLOCKS_LIMIT + 1 block is the selectedBlock
          blocks = [...blocks, tempSelectedBlock]
        }
      }

      return {
        ...state,
        blocks,
        latestBlock,
        loading: false,
        selectedBlock
      }
    case SELECT_BLOCK:
      return {
        ...state,
        selectedBlock: action.payload
      }
    case QUICKLY_GET_BLOCK:
      return state
    case GET_BLOCK:
      return state
    case UPDATE_BLOCK:
      let num = action.payload.number
      let updateIdx = state.blocks.findIndex(block => block.number === num)
      if (updateIdx > -1) { // update
        let timestamp = action.payload.timestamp
        let totalTransactionsLength = action.payload.transactions.length
        // only save transaction with value
        let valueTransactions = action.payload.transactions.filter(transaction => {
          let value = new BigNumber(transaction.value)
          return !value.isZero()
        })
        state.blocks.splice(updateIdx, 1, {
          number: num,
          timestamp,
          totalTransactionsLength,
          valueTransactions
        })
        let blocks = state.blocks
        return {
          ...state,
          blocks,
          loading: false,
          selectedBlock: num
        }
      } else {
        return state
      }
    default:
      return state
  }
}

export default blockReducer

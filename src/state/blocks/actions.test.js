/* global describe, it, expect */
import * as types from './types'
import * as actions from './actions'

describe('actions', () => {
  it('should create an action to get latest blocks', () => {
    const expectedAction = {
      type: types.WATCH_BLOCKS
    }
    expect(actions.watchBlocks()).toEqual(expectedAction)
  })

  it('should create an action to get latest block', () => {
    const expectedAction = {
      type: types.QUICKLY_GET_BLOCK
    }
    expect(actions.quicklyGetBlock()).toEqual(expectedAction)
  })

  it('should create an action to get specified block via block number', () => {
    const expectedAction = {
      type: types.GET_BLOCK,
      payload: 123456
    }
    expect(actions.getBlock(123456)).toEqual(expectedAction)
  })

  it('should create an action to save block to store', () => {
    const expectedAction = {
      type: types.SAVE_BLOCK,
      payload: {}
    }
    expect(actions.saveBlock({})).toEqual(expectedAction)
  })

  it('should create an action to process and update the block data', () => {
    const expectedAction = {
      type: types.UPDATE_BLOCK,
      payload: {}
    }
    expect(actions.updateBlock({})).toEqual(expectedAction)
  })

  it('should create an action to select block data from store', () => {
    const expectedAction = {
      type: types.SELECT_BLOCK,
      payload: 123456
    }
    expect(actions.selectBlock(123456)).toEqual(expectedAction)
  })
})

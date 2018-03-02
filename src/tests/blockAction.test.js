import * as actions from '../actions/index';

describe('actions', () => {
  it('should create an action to get latest blocks', () => {
    const expectedAction = {
      type: actions.WATCH_BLOCKS
    }
    expect(actions.watchBlocks()).toEqual(expectedAction);
  });

  it('should create an action to get latest block', () => {
    const expectedAction = {
      type: actions.QUICKLY_GET_BLOCK,
    }
    expect(actions.quicklyGetBlock()).toEqual(expectedAction);
  });

  it('should create an action to get specified block via block number', () => {
    const expectedAction = {
      type: actions.GET_BLOCK,
      payload: 123456
    }
    expect(actions.getBlock(123456)).toEqual(expectedAction);
  });

  it('should create an action to save block to store', () => {
    const expectedAction = {
      type: actions.SAVE_BLOCK,
      payload: {}
    }
    expect(actions.saveBlock({})).toEqual(expectedAction);
  });

  it('should create an action to process and update the block data', () => {
    const expectedAction = {
      type: actions.UPDATE_BLOCK,
      payload: {}
    }
    expect(actions.updateBlock({})).toEqual(expectedAction);
  });

  it('should create an action to select block data from store', () => {
    const expectedAction = {
      type: actions.SELECT_BLOCK,
      payload: 123456
    }
    expect(actions.selectBlock(123456)).toEqual(expectedAction);
  });
});

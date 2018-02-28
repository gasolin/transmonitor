import * as actions from '../actions/index';

describe('actions', () => {
  it('should create an action to get latest blocks', () => {
    const expectedAction = {
      type: actions.GET_BLOCKS
    }
    expect(actions.getBlocks()).toEqual(expectedAction);
  });

  it('should create an action to save block to store', () => {
    const expectedAction = {
      type: actions.SAVE_BLOCK,
      payload: {}
    }
    expect(actions.saveBlock({})).toEqual(expectedAction);
  });

  it('should create an action to select block data from store', () => {
    const expectedAction = {
      type: actions.SELECT_BLOCK,
      payload: 123456
    }
    expect(actions.selectBlock(123456)).toEqual(expectedAction);
  });
});

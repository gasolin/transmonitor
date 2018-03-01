import blockReducer from '../reducers/blocks';
import * as types from '../actions/index';
import {BigNumber} from 'bignumber.js';

const initBlockState = {
  latestBlock: null,
  selectedBlock: null,
  loading: false,
  blocks: [],
};

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(blockReducer(undefined, {})).toEqual(initBlockState);
  })

  it('should handle GET_BLOCKS', () => {
    expect(blockReducer(
      undefined,
      {
        type: types.GET_BLOCKS
      }
    )).toEqual({
      ...initBlockState,
      loading: true,
    });
  })

  it('should handle SELECT_BLOCK', () => {
    expect(blockReducer(
      undefined,
      {
        type: types.SELECT_BLOCK,
        payload: 123456,
      }
    )).toEqual({
      ...initBlockState,
      selectedBlock: 123456,
    });
  })
});

const firstSaveBlcok ={
  ...initBlockState,
  latestBlock: 123456,
  loading: false,
  blocks: [{
    number: 123456,
    timestamp: 1519749008,
    totalTransactionsLength: 3,
    valueTransactions: [
      {
        hash: '0xa51d242d58030d110ad8579ba04174e861d4f87e432d2498bae9423a4c6d5ed8',
        from: '0x471138d67093de52d9d11084aad707ba0800a5c2',
        to: '0x2a0c0dbecc7e4d658f48e01e3fa353f44050c208',
        value: new BigNumber('16500000000000000000'),
      }, {
        hash: '0x8ce9659381e74d654d648f24eff5209a535987523925204a85ce29ad2e21755a',
        from: '0x3dda61b077660745a6a8bef0d112f6f32ac67bca',
        to: '0x5a7456983c188415cda917f117c981ee5207d84f',
        value: new BigNumber('33000000000'),
      }
    ],
  }]
};

const secondSaveBlcok ={
  ...initBlockState,
  latestBlock: 123457,
  loading: false,
  blocks: [{
    number: 123456,
    timestamp: 1519749008,
    totalTransactionsLength: 3,
    valueTransactions: [
      {
        hash: '0xa51d242d58030d110ad8579ba04174e861d4f87e432d2498bae9423a4c6d5ed8',
        from: '0x471138d67093de52d9d11084aad707ba0800a5c2',
        to: '0x2a0c0dbecc7e4d658f48e01e3fa353f44050c208',
        value: new BigNumber('16500000000000000000'),
      }, {
        hash: '0x8ce9659381e74d654d648f24eff5209a535987523925204a85ce29ad2e21755a',
        from: '0x3dda61b077660745a6a8bef0d112f6f32ac67bca',
        to: '0x5a7456983c188415cda917f117c981ee5207d84f',
        value: new BigNumber('33000000000'),
      }
    ],
  },
  {
    number: 123457,
    timestamp: 1519749108,
    totalTransactionsLength: 2,
    valueTransactions: [{
      hash: '0xdd00f5aaae1af883e40098c927a6a8dc230b941654c3a2a5d9ad4c79f79c558a',
      from: '0x68b1a89523b7ed11f499f36ba266c688401cdbc1',
      to: '0x8ad76a1bef25cd903b8c1de72af6d2eb30218c95',
      value: new BigNumber('199889030000000000'),
    }],
  }]
};

it('should handle first SAVE_BLOCK', () => {
  expect(blockReducer(
    undefined,
    {
      type: types.SAVE_BLOCK,
      payload: {
        number: 123456,
        transactions: [{
          hash: '0xa51d242d58030d110ad8579ba04174e861d4f87e432d2498bae9423a4c6d5ed8',
          from: '0x471138d67093de52d9d11084aad707ba0800a5c2',
          to: '0x2a0c0dbecc7e4d658f48e01e3fa353f44050c208',
          value: new BigNumber('16500000000000000000'),
        }, {
          hash: '0x8ce9659381e74d654d648f24eff5209a535987523925204a85ce29ad2e21755a',
          from: '0x3dda61b077660745a6a8bef0d112f6f32ac67bca',
          to: '0x5a7456983c188415cda917f117c981ee5207d84f',
          value: new BigNumber('33000000000'),
        }, {
          hash: '0xdd00f5aaae1af883e40098c927a6a8dc230b941654c3a2a5d9ad4c79f79c558a',
          from: '0x68b1a89523b7ed11f499f36ba266c688401cdbc1',
          to: '0x8ad76a1bef25cd903b8c1de72af6d2eb30218c95',
          value: new BigNumber('0'),
        }],
        timestamp: 1519749008
      },
    }
  )).toEqual(firstSaveBlcok);
});

it('should handle next SAVE_BLOCK', () => {
  expect(blockReducer(
    firstSaveBlcok,
    {
      type: types.SAVE_BLOCK,
      payload: {
        number: 123457,
        transactions: [{
          hash: '0xdd00f5aaae1af883e40098c927a6a8dc230b941654c3a2a5d9ad4c79f79c558a',
          from: '0x68b1a89523b7ed11f499f36ba266c688401cdbc1',
          to: '0x8ad76a1bef25cd903b8c1de72af6d2eb30218c95',
          value: new BigNumber('199889030000000000'),
        }, {
          hash: '0xdd00f5aaae1af883e40098c927a6a8dc230b941654c3a2a5d9ad4c79f79c558a',
          from: '0x68b1a89523b7ed11f499f36ba266c688401cdbc1',
          to: '0x8ad76a1bef25cd903b8c1de72af6d2eb30218c95',
          value: new BigNumber('0'),
        }],
        timestamp: 1519749108
      },
    }
  )).toEqual(secondSaveBlcok);
});
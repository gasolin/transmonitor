import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {BigNumber} from 'bignumber.js';
import TransactionList from '../components/TransactionList';

describe('TransactionList', function() {
  let mockPropsNoSelectedBlock = {
    blocks: [{}],
    selectedBlock: null,
  };

  let mockPropsNoBlock = {
    blocks: [],
    selectedBlock: null,
  };

  // the order should be 123458: 3/6, 123457: 1/5, 123456: 2/4
  let mockProps = {
    blocks: [
      {
        number: 123456,
        valueTransactions: [{
          hash: '0xa51d242d58030d110ad8579ba04174e861d4f87e432d2498bae9423a4c6d5ed8',
          from: '0x471138d67093de52d9d11084aad707ba0800a5c2',
          to: '0x2a0c0dbecc7e4d658f48e01e3fa353f44050c208',
          value: new BigNumber('16500000000000000000'),
        }, {
          hash: '0x8ce9659381e74d654d648f24eff5209a535987523925204a85ce29ad2e21755a',
          from: '0x3dda61b077660745a6a8bef0d112f6f32ac67bca',
          to: '0x5a7456983c188415cda917f117c981ee5207d84f',
          value: new BigNumber('33000000000'),
        }],
        totalTransactionsLength: 4,
        timestamp: 1519748998
      },
      {
        number: 123457,
        valueTransactions: [{
          hash: '0xdd00f5aaae1af883e40098c927a6a8dc230b941654c3a2a5d9ad4c79f79c558a',
          from: '0x68b1a89523b7ed11f499f36ba266c688401cdbc1',
          to: '0x8ad76a1bef25cd903b8c1de72af6d2eb30218c95',
          value: new BigNumber('199889030000000000'),
        }],
        totalTransactionsLength: 5,
        timestamp: 1519749008
      },
      {
        number: 123458,
        valueTransactions: [{
          hash: '0x8234d8a159441b09a08b6ff019085eef938d07bcca29bae907e8bbcaf762f19',
          from: '0x776d8bf339a5735e8c7a3a7bbdd2ceb5293949bf',
          to: '0xe7e9643905ca3a07144c6da64b3ad0671b4b1a93',
          value: new BigNumber('2023320110000000000'),
        }, {
          hash: '0xaa8274f0168a1a6712ef0927e590cc7305bf1e12e63abbd2d615ced9a67792d8',
          from: '0x7e2541f720e44b3fef6b81b2adb148471ee8b63d',
          to: '0x2a0c0dbecc7e4d658f48e01e3fa353f44050c208',
          value: new BigNumber('612062408121995274'),
        }, {
          hash: '0x216ea767f72df6d56cd14dcee0d3ff96d96beb9e30c4b53709c9c95d0f90edc1',
          from: '0x850e9d041de71069cfb38bab2716cba34325979b',
          to: '0x23be96a5cdefd4fcf8e153691e15d7b21f5b2ff4',
          value: new BigNumber('1988327790000000000'),
        }],
        totalTransactionsLength: 6,
        timestamp: 1519749108
      },
    ],
    selectedBlock: 123457,
  };

  it('renders without crashing when no selectedBlock', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TransactionList {...mockPropsNoSelectedBlock} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders without crashing when no block', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TransactionList {...mockPropsNoBlock} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TransactionList {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('render null when no selectedBlock', () => {
    const component = renderer.create(<TransactionList {...mockPropsNoBlock} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('render null when no blocks', () => {
    const component = renderer.create(<TransactionList {...mockPropsNoBlock} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('render correctly', () => {
    const component = renderer.create(<TransactionList {...mockProps} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});

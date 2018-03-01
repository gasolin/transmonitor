import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import BlockList from '../components/BlockList';

describe('BlockList', function() {
  let mockPropsLoading = {
    loading: true,
    selectBlock: () => {},
  };

  let mockPropsNoBlock = {
    blocks: [],
    loading: false,
    selectBlock: () => {},
  };

  // the order should be 123458: 3/6, 123457: 1/5, 123456: 2/4
  let mockProps = {
    blocks: [
      {
        number: 123456,
        valueTransactions: [{}, {}],
        totalTransactionsLength: 4,
        timestamp: 1519748998
      },
      {
        number: 123457,
        valueTransactions: [{}],
        totalTransactionsLength: 5,
        timestamp: 1519749008
      },
      {
        number: 123458,
        valueTransactions: [{}, {}, {}],
        totalTransactionsLength: 6,
        timestamp: 1519749108
      },
    ],
    loading: false,
    selectBlock: () => {},
  };

  it('renders without crashing when loading', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BlockList {...mockPropsLoading} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders without crashing after loading', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BlockList {...mockPropsNoBlock} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders null without crashing after loading', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BlockList {...mockPropsNoBlock} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('render null when no blocks', () => {
    const component = renderer.create(<BlockList {...mockPropsNoBlock} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('render correctly', () => {
    const component = renderer.create(<BlockList {...mockProps} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});

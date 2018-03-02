import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Header from '../components/Header';

describe('BlockList', function() {
  let mockProps = {
    latestBlock: 123456,
    selectBlock: () => {},
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('render correctly', () => {
    const component = renderer.create(<Header {...mockProps} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

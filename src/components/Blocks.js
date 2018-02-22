import React from 'react';
import {connect} from 'react-redux';
import {loadBlocks, clear} from '../actions';

export function Blocks(props) {
  return (
    <div>
      <h3>Current Block: {props.latestBlock}</h3>
      <button type="button" onClick={props.loadBlocks} >Load Demo Blocks</button>
      <button type="button" onClick={props.clear} >Clear</button>
      <BlockList {...props} />
    </div>
  );
}

function BlockList(props) {
  if (props.blocks.length === 0) return null;
  return (
    <div>
      {props.blocks.map(item => <Block {...item} key={item.number} />)}
    </div>
  );
}

function Block(props) {
  return <p>{props.number}</p>;
}

function mapState(state) {
  return state;
}

function mapDispatch(dispatch) {
  return {
    loadBlocks: () => dispatch(loadBlocks()),
    clear: () => dispatch(clear())
  }
}

export default connect(mapState, mapDispatch)(Blocks);

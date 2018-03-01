import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';

let handleClick = (e, selectBlock) => {
  // should not prevent default here since we want to jump to the top of
  // transactions list with the html anchor
  if (e.target.id) {
    selectBlock(parseInt(e.target.id, 10));
  }
};

export function BlockList(props) {
  if (props.loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (props.blocks.length === 0) return null;
  return (
    <Table bordered striped responsive>
      <thead>
        <tr>
          <th>Block #</th>
          <th>Transactions (with value/total)</th>
        </tr>
      </thead>
      <tbody onClick={(e) => handleClick(e, props.selectBlock)}>
      {props.blocks.sort((a, b) => b.number - a.number).map(block =>
        <Block {...block} key={block.number}/>)}
      </tbody>
    </Table>
  );
}

function Block(block) {
  return (<tr>
    <th>{block.number}</th>
    <th><a href="#transactions" id={block.number}>{block.valueTransactions.length}</a> / {block.totalTransactionsLength}</th>
    <th>{new Date(block.timestamp * 1000).toLocaleString()}</th>
  </tr>);
}

BlockList.propTypes = {
  blocks: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  selectBlock: PropTypes.func.isRequired,
};

export default BlockList;

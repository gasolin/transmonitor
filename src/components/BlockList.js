import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';
import Loading from '../loading-bubbles.svg';

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
      <div><img src={Loading} alt="Loading..."/></div>
    );
  }

  if (props.blocks.length === 0) return null;
  return (
    <Table id="blocks" bordered striped hover responsive size="sm">
      <caption>List of blocks</caption>
      <thead>
        <tr>
          <th>Block #</th>
          <th>Transactions (with value/total)</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody onClick={(e) => handleClick(e, props.selectBlock)}>
      {props.blocks.map(block => {
        block.selected = block.number === props.selectedBlock;
        return <Block {...block} key={block.number}/>
      })}
      </tbody>
    </Table>
  );
}

function Block(block) {
  let selected = block.selected ? 'table-primary' : '';
  let transactions = block.totalTransactionsLength ? (<span>
    <a href="#transactions" id={block.number}>
    {block.valueTransactions.length}</a> / {block.totalTransactionsLength}
  </span>
  ) : (<span>...</span>);
  return (<tr className={selected}>
    <th>{block.number}</th>
    <th>{transactions}</th>
    <th>{block.timestamp ? new Date(block.timestamp * 1000).toLocaleString() : ''}</th>
  </tr>);
}

BlockList.propTypes = {
  blocks: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  selectBlock: PropTypes.func.isRequired,
};

export default BlockList;

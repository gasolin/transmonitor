import React from 'react';
import {Table} from 'reactstrap';

let handleClick = (e, selectBlock) => {
  e.preventDefault();
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
    <Table>
      <thead>
        <tr>
          <th>Block #</th>
          <th>Transactions with value</th>
          <th>Transactions</th>
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
    <th><a href="#transactions" id={block.number}>{block.valueTransactions.length}</a></th>
    <th>{block.totalTransactionsLength}</th>
    <th>{new Date(block.timestamp * 1000).toLocaleString()}</th>
  </tr>);
}

export default BlockList;

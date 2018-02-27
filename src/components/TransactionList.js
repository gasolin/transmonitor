import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';
import {ethWeb3} from '../web3connection';
export function TransactionList(props) {
  if (props.blocks.length === 0 || !props.selectedBlock) return null;
  let idx = props.blocks.findIndex(block => block.number ===  props.selectedBlock);
  if (idx === -1) return null;
  let sortedBlocks = props.blocks.sort((a, b) => b.number - a.number);
  return (<div id="transactions">
    <h3>Selected Block #{props.selectedBlock}</h3>
    <Table>
      <thead>
        <tr>
          <th>hash #</th>
          <th>from</th>
          <th>to</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
      {sortedBlocks[idx].valueTransactions.map(transaction => <Transaction {...transaction} key={transaction.hash} />)}
      </tbody>
    </Table>
  </div>);
}

function format(text) {
  return `${text.substring(0, 17)}...`;
}

function Transaction(transaction) {
  return (<tr>
    <th><a href={`https://etherscan.io/tx/${transaction.hash}`} target="_blank">{format(transaction.hash)}</a></th>
    <th><a href={`https://etherscan.io/address/${transaction.from}`} target="_blank">{format(transaction.from)}</a></th>
    <th><a href={`https://etherscan.io/address/${transaction.to}`} target="_blank">{format(transaction.to)}</a></th>
    <th>{ethWeb3.fromWei(transaction.value, 'ether').toString()} Ether</th>
  </tr>);
}

TransactionList.propTypes = {
  blocks: PropTypes.array,
  selectedBlock: PropTypes.number,
};

export default TransactionList;

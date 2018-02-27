/* global web3 */
import React from 'react';
import {connect} from 'react-redux';
import Web3 from 'web3';
import {
  Badge,
  // Button,
  Table,
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import {
  clear,
  getBlocks,
  loadBlocks,
  selectBlock,
} from '../actions';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

export function Blocks(props) {
  return (
    <div>
      <Header {...props} />
      {/* <h3>Latest Block #{props.latestBlock}</h3>
      <Button outline color="primary" onClick={props.getBlocks} >Get Blocks</Button>{' '}
      <Button outline onClick={props.loadBlocks} >Load Demo Blocks</Button>{' '}
      <Button outline onClick={props.clear} >Clear</Button> */}
      <BlockList {...props} />
      <TransactionsList {...props} />
    </div>
  );
}

function Header(props) {
  let latestBlock = props.latestBlock ? (
    <Badge color="info" tooltip="Latest Block" onClick={() => props.selectBlock(props.latestBlock)}>#{props.latestBlock}</Badge>
  ): "";
  return (
    <Navbar color="dark" dark expand="lg">
      <NavbarBrand href="#transactions">Transactions Monitor {latestBlock}</NavbarBrand>
    </Navbar>
  );
}

let handleClick = (e, selectBlock) => {
  e.preventDefault();
  if (e.target.id) {
    selectBlock(parseInt(e.target.id, 10));
  }
};

function BlockList(props) {
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

function TransactionsList(props) {
  if (props.blocks.length === 0 || !props.selectedBlock) return null;
  let idx = props.blocks.findIndex(block => block.number ===  props.selectedBlock);
  if (props.selectedBlockidx === -1) return null;
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
    <th>{web3.fromWei(transaction.value, 'ether').toString()} Ether</th>
  </tr>);
}

function mapState(state) {
  return {
    blocks: state.blocks.blocks,
    latestBlock: state.blocks.latestBlock,
    loading: state.blocks.loading,
    selectedBlock: state.blocks.selectedBlock
  };
}

function mapDispatch(dispatch) {
  return {
    clear: () => dispatch(clear()),
    getBlocks: () => dispatch(getBlocks()),
    loadBlocks: () => dispatch(loadBlocks()),
    selectBlock: (block) => dispatch(selectBlock(block)),
  }
}

export default connect(mapState, mapDispatch)(Blocks);

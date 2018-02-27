import React from 'react';
import {connect} from 'react-redux';
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
} from '../actions';

export function Blocks(props) {
  return (
    <div>
      <Header {...props} />
      {/* <h3>Latest Block #{props.latestBlock}</h3>
      <Button outline color="primary" onClick={props.getBlocks} >Get Blocks</Button>{' '}
      <Button outline onClick={props.loadBlocks} >Load Demo Blocks</Button>{' '}
      <Button outline onClick={props.clear} >Clear</Button> */}
      <BlockList {...props} />
    </div>
  );
}

function Header(props) {
  let latestBlock = props.latestBlock ? (
    <Badge color="info" tooltip="Latest Block">#{props.latestBlock}</Badge>
  ): "";
  return (
    <Navbar color="dark" dark expand="lg">
      <NavbarBrand href="#transactions">Transactions Monitor {latestBlock}</NavbarBrand>
    </Navbar>
  );
}

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
      <tbody>
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
  }
}

export default connect(mapState, mapDispatch)(Blocks);

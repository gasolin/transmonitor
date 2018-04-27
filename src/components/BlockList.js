import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Table
} from 'reactstrap'
import Loading from '../loading-bubbles.svg'
import { smoothScroll } from '../utils'

let handleClick = (e, props) => {
  if (e.target.id) {
    e.preventDefault()
    props.selectBlock(parseInt(e.target.id, 10))
    smoothScroll('#transactions')
  }
  if (e.target.dataset.block) {
    props.getBlock(parseInt(e.target.dataset.block, 10))
    smoothScroll('#transactions')
  }
}

export function BlockList (props) {
  if (props.web3 === null) {
    return (
      <Alert color='danger'>Your browser is not connected to the ethereum network. Please install <a href='https://metamask.io/' target='_blank' rel='noopener noreferrer'>MetaMask</a>.</Alert>
    )
  }
  if (props.loading) {
    return (
      <div><img src={Loading} alt='Loading...' /></div>
    )
  }

  if (props.blocks.length === 0) return null
  return (
    <Table id='blocks' bordered striped hover responsive size='sm'>
      <caption>List of blocks</caption>
      <thead>
        <tr>
          <th>Block #</th>
          <th>Transactions (with value/total)</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody onClick={(e) => handleClick(e, props)}>
        {props.blocks.map(block => {
          block.selected = block.number === props.selectedBlock
          return <Block {...block} key={block.number} />
        })}
      </tbody>
    </Table>
  )
}

function Block (block) {
  let selected = block.selected ? 'table-primary' : ''
  let blockNumber = block.totalTransactionsLength !== undefined ? (<span>{block.number}</span>)
    : (<span>
      <a href='#blocks' data-block={block.number}>{block.number}</a>
    </span>)
  let transactions = (block.valueTransactions && block.totalTransactionsLength !== undefined) ? (<span>
    <a href='#transactions' id={block.number}>
      {block.valueTransactions.length}</a> / {block.totalTransactionsLength}
  </span>
  ) : (<span>...</span>)
  return (<tr className={selected}>
    <th>{blockNumber}</th>
    <th>{transactions}</th>
    <th>{block.timestamp ? new Date(block.timestamp * 1000).toLocaleString() : ''}</th>
  </tr>)
}

BlockList.propTypes = {
  blocks: PropTypes.array,
  getBlock: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  selectBlock: PropTypes.func.isRequired,
  web3: PropTypes.object
}

export default BlockList

import React from 'react'
import {connect} from 'react-redux'
import {
  getBlock,
  selectBlock
} from './state/actions'
import {Header} from './components/Header'
import {BlockList} from './components/BlockList'
import {TransactionList} from './components/TransactionList'

export function App (props) {
  return (
    <div>
      <Header {...props} />
      <BlockList {...props} />
      <TransactionList {...props} />
    </div>
  )
}

function mapState (state) {
  return {
    blocks: state.blocks.blocks,
    latestBlock: state.blocks.latestBlock,
    loading: state.blocks.loading,
    noConnection: state.blocks.noConnection,
    selectedBlock: state.blocks.selectedBlock
  }
}

function mapDispatch (dispatch) {
  return {
    getBlock: (block) => dispatch(getBlock(block)),
    selectBlock: (block) => dispatch(selectBlock(block))
  }
}

export default connect(mapState, mapDispatch)(App)

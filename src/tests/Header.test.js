/* global describe, it, expect */
import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Header from '../components/Header'

describe('BlockList', function () {
  let mockProps = {
    latestBlock: null,
    selectBlock: () => {}
  }

  let mockPropsWithLatestBlock = {
    latestBlock: 123456,
    selectBlock: () => {}
  }

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Header {...mockProps} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders without crashing with latest block', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Header {...mockPropsWithLatestBlock} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('render correctly', () => {
    const component = renderer.create(<Header {...mockProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render correctly with latest block', () => {
    const component = renderer.create(<Header {...mockPropsWithLatestBlock} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

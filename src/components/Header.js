import React from 'react'
import PropTypes from 'prop-types'
import {
  Badge,
  Navbar,
  NavbarBrand
} from 'reactstrap'
import { smoothScroll } from '../utils'

function handleClick (e, props) {
  e.preventDefault()
  props.selectBlock(props.latestBlock)
  smoothScroll('#transactions')
}

export function Header (props) {
  return props.latestBlock ? (
    <Navbar color='dark' dark expand='lg'>
      <NavbarBrand href='#transactions' onClick={(e) => handleClick(e, props)}>Transactions Monitor <Badge color='info' tooltip='Latest Block'>#{props.latestBlock}</Badge>
      </NavbarBrand>
    </Navbar>
  ) : (
    <Navbar color='dark' dark expand='lg'>
      <NavbarBrand href='#'>Transactions Monitor</NavbarBrand>
    </Navbar>
  )
}

Header.propTypes = {
  latestBlock: PropTypes.number,
  selectBlock: PropTypes.func.isRequired
}

export default Header

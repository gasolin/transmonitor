import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Navbar,
  NavbarBrand,
} from 'reactstrap';

export function Header(props) {
  let latestBlock = props.latestBlock ? (
    <Badge color="info" tooltip="Latest Block" onClick={() => props.selectBlock(props.latestBlock)}>#{props.latestBlock}</Badge>
  ): "";
  return (
    <Navbar color="dark" dark expand="lg">
      <NavbarBrand href="#transactions">Transactions Monitor {latestBlock}</NavbarBrand>
    </Navbar>
  );
}

Header.propTypes = {
  latestBlock: PropTypes.number,
  selectBlock: PropTypes.func.isRequired,
};

export default Header;

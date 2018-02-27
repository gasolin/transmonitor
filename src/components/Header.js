import React from 'react';
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

export default Header;

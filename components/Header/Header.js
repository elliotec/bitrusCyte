import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import './Header.css';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';


export default class Header extends React.Component {
  render() {
    return (
      <Navbar className="header-menu">
         <Navbar.Header>
           <Navbar.Brand>
             <a className="logo" href="/">
                 BitrusCyte
             </a>
           </Navbar.Brand>
           <Navbar.Toggle />
         </Navbar.Header>
         <Navbar.Collapse>
           <Nav>
               <LinkContainer to='/products/'>
               <NavItem className="nav-link">Controls</NavItem>
             </LinkContainer>
             <LinkContainer to='/about/'>
               <NavItem className="nav-link">Admin</NavItem>
             </LinkContainer>
           </Nav>
         </Navbar.Collapse>
      </Navbar>
    );
  }
}

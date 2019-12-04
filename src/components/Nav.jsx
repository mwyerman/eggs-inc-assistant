import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <header>

      <Navbar variant="dark" bg="dark" expand="md">
        <Navbar.Brand href="/">Eggs Inc Assistant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink exact className="nav-link" to="/">Home</NavLink>
            <NavLink exact className="nav-link" to="/epic-research">Epic Research</NavLink>
            <NavLink exact className="nav-link" to="/contract-calculator">Contract Calculator</NavLink>
            <NavLink exact className="nav-link" to="/mystical-eggs">Mystical Eggs</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;

import React from 'react';
import {
  Navbar, Container, Image, Form, FormControl, Button,
} from 'react-bootstrap';
import { signIn } from '../utils/auth.js';

export default function NoAuthNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="nav-bar shadow-sm">
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <Image
            src="/logo.png"
            alt="Nest Nuggets Logo"
            height={60}
            className="d-inline-block"
          />
          <span className="fw-bold text-primary" style={{ fontSize: '1.25rem' }}>
            Nest Nuggets
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Button
            type="button"
            className="btn btn-primary"
            onClick={signIn}
          >
            Sign In
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

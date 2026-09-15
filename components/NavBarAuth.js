import React from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Container, Image, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth.js';

export default function NavBarAuth() {
  const router = useRouter();

  return (
    <Navbar collapseOnSelect expand="lg" className="nav-bar shadow-sm">
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center gap-2"
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}
        >
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
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto gap-3 align-items-center">
            <Nav.Link
              href="/review/new"
              className="text-primary fw-medium"
            >
              Write a Review
            </Nav.Link>
            <Nav.Link
              href="/userDashboard/new"
              className="text-primary fw-medium"
            >
              My Dashboard
            </Nav.Link>
            <Button
              variant="danger"
              className="btn"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

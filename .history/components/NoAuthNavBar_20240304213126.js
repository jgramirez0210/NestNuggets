import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Image, Form, FormControl, Button,
} from 'react-bootstrap';
import { signIn } from '../utils/auth';

export default function NoAuthNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="nav-bar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image src="/logo.png" alt="Nest Nuggets Logo" height={75} className="d-inline-block align-top" /> Nest Nuggets
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
            Sign In
          </Button>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

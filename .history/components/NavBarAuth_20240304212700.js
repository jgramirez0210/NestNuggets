import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Image, Form, FormControl, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image src="/logo.png" alt="Nest Nuggets Logo" height={75} className="d-inline-block align-top" /> Nest Nuggets
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Link passHref href="/review/edit/new">
            <Navbar.Brand> Review a Property</Navbar.Brand>
          </Link>
          <Link passHref href="/userDashboard/new">
            <Navbar.Brand> User Dashboard</Navbar.Brand>
          </Link>
          <Button variant="danger" onClick={signOut}>Sign Out</Button>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

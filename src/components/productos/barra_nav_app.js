import React, { Component, useState } from 'react';
import { Button,Nav,Navbar,NavDropdown,Form,FormControl } from 'react-bootstrap';
import {Link}from "react-router-dom";

const BarraNavApp=(props)=>{
   
    const [estado,setEstado]=useState(null)

    return (
        <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home">
                <img
                alt=""
                src="/logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            Stools
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end"> 
            <Nav className="mr-auto">
            <Nav.Link href="/pedido">Pedido</Nav.Link>
            <Nav.Link href="/contacto">Contactos</Nav.Link>
            <Nav.Link href="/producto">Productos</Nav.Link>
            <Nav.Link href="/reporte">reportes</Nav.Link>
            <Nav.Link href="/categoria">categoria</Nav.Link>
            <NavDropdown title="Configuración" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">Usuarios</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">variables</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Sistema</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form inline>
            <Button variant="outline-success">Salir</Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    );   
}
 
export default BarraNavApp;
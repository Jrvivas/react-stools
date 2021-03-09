import React, { Component } from 'react';
import { Button,Nav,Navbar,NavDropdown,Form,FormControl } from 'react-bootstrap';

class BarraBusquedaProducto extends Component {
   
    constructor(props) {
        super(props);
        this.state = {  }
        this.items=[ {  label:'Categoria',
                        icon:'pi pi-fw pi-list',
                        items:[{label:'Todo'}]
                        },
    ]
    }
    render() { 
        return (
            <Navbar  bg="light" expand="lg" variant="light" className='mt-2'>
            <Navbar.Brand href="#home">Producto</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="mr-auto ">
                <Nav.Link href="#link">Stock</Nav.Link>
                <NavDropdown title="Categoria" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Cateogia 1</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Cateogia 2</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Cateogia 3</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Crear Categoria</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
                <Button variant="outline-success">Buscar</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
      );
    }
}

class BarraBusqueda extends Component {
   
  constructor(props) {
      super(props);
      this.state = {  }
      this.items=[ {  label:'Categoria',
                      icon:'pi pi-fw pi-list',
                      items:[{label:'Todo'}]
                      },
  ]
  }
  render() { 
      return (
          <Navbar  bg="light" expand="lg" variant="light" className='mt-2'>
          <Navbar.Brand href="#home">{this.props.titulo}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="mr-auto ">
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Buscar" className="mr-sm-2" onKeyUp={this.props.handlertextChange}/>
              <Button variant="outline-success">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default BarraBusqueda; 
//export default BarraBusquedaProducto;
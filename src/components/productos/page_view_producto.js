import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup,Spinner, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Producto from '../../models/app_model_producto';
import AppSys from '../../models/app_sys';
import BotonesCancelEditDel from '../botones_cancel_edit_del';

class PageViewProducto extends Component {
  constructor(props) {
    super(props);

    this.state = { idProducto: 0, producto: null }
  }

  componentWillMount() {
    Producto.find(this.props.idProducto,null, (prto) => {
      this.setState({ idProducto: prto.id, producto: prto })
    })
  }


  // cuando se actualise el producto celeccionado
  componentDidUpdate(prevProps) {
    if (prevProps.idProducto !== this.props.idProducto) {
      Producto.find(this.props.idProducto,null, (prto) => {
        this.setState({ idProducto: prto.id, producto: prto })
      })

    }
  }

  handlercancelar = () => {
    alert('salimos de la ventana')
  }

  handlerEdit = () => {
    alert('Se editará este producto')
  }
  handlerBorrar = () => {
    alert('Se borrará este producto')
  }

  render() {
    let pto = this.state.producto;
    let img='/assets/imgs/producto.svg'
  
    if (this.state.producto) {
      if(pto.urlFoto){
          img=AppSys.urlBase +'/'+pto.urlFoto
        }

      return (
        <Row className="mt-5">
     
          <Col>
            <Card style={{ width: '18rem', marginRight:'auto',marginLeft:'auto' }}>
              <Card.Img variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)' }} />
              <Card.Body>
                <Card.Title>{pto.nombre}</Card.Title>
                <Card.Text>
                  {pto.descripcion}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Tipo de producto: {' ' + pto.unidad}</ListGroupItem>
                <ListGroupItem>Costo:{' $' + pto.costo ? pto.costo : '0.00'}</ListGroupItem>
                <ListGroupItem>Precio:{' $' + pto.precio ? pto.precio : '0.00'}</ListGroupItem>
                <ListGroupItem>Stock:{' ' + pto.stock ? pto.stock : '-'}</ListGroupItem>
              </ListGroup>
              <BotonesCancelEditDel entidad='producto' id={pto.id}></BotonesCancelEditDel>
             
            </Card>
          </Col>
          
        </Row>

      )
    }else{
      return (
        <Spinner animation="grow" />
      )
    }

  }
}

export default PageViewProducto;
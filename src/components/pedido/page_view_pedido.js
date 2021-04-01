
import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup,Spinner, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppSys from '../../models/app_sys';
import Pedido from '../../models/app_model_pedido';
import BotonesCancelEditDel from '../botones_cancel_edit_del';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/16/2021, 18:22:17 ---



class PageViewPedido extends Component {
  constructor(props) {
    super(props);

    this.state = { idPedido: 0, pedido: null }
  }

  componentWillMount() {
    Pedido.find(this.props.idPedido,null, (prto) => {
      this.setState({ idPedido: prto.id, pedido: prto })
    })
  }


  // cuando se actualise el pedido celeccionado
  componentDidUpdate(prevProps) {
    if (prevProps.idPedido !== this.props.idPedido) {
      Pedido.find(this.props.idPedido,null, (prto) => {
        this.setState({ idPedido: prto.id, pedido: prto })
      })

    }
  }

  handlercancelar = () => {
    alert('salimos de la ventana')
  }

  handlerEdit = () => {
    alert('Se editará este pedido')
  }
  handlerBorrar = () => {
    alert('Se borrará este pedido')
  }

  render() {
    let obj = this.state.pedido;
    let img='/assets/imgs/pedido.svg'
    
    if (this.state.pedido) {
        if(obj.cliente.urlFoto && obj.cliente.urlFoto.length>0 ){
            img=AppSys.urlBase+'/'+ obj.cliente.urlFoto
        }
    
      return (
        <Row className="mt-5">
     
          <Col>
            <Card style={{ width: '18rem', marginRight:'auto',marginLeft:'auto' }}>
              <Card.Img variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)' }} />
              <Card.Body>
                <Card.Title>{obj.cliente.nombre}</Card.Title>
                <Card.Text>
                  {obj.cliente.empresa}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                				<ListGroupItem>Dirección: {' ' + obj.cliente.direccion}</ListGroupItem>
				<ListGroupItem>Localidad: {' ' + obj.cliente.localidad}</ListGroupItem>
				<ListGroupItem>Movil: {' ' + obj.cliente.cel}</ListGroupItem>
				<ListGroupItem>Fijo: {' ' + obj.cliente.tel}</ListGroupItem>

              </ListGroup>

              <BotonesCancelEditDel entidad='pedido' id={obj.id}></BotonesCancelEditDel>
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

export default PageViewPedido;
  
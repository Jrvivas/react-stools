
import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup,Spinner, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppSys from '../../models/app_sys';
import Detallepedido from '../../models/app_model_detallepedido';
import BotonesCancelEditDel from '../botones_cancel_edit_del';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/25/2021, 15:03:18 ---



class PageViewDetallepedido extends Component {
  constructor(props) {
    super(props);

    this.state = { idDetallepedido: 0, detallepedido: null }
  }

  componentWillMount() {
    Detallepedido.find(this.props.idDetallepedido,null, (prto) => {
      this.setState({ idDetallepedido: prto.id, detallepedido: prto })
    })
  }


  // cuando se actualise el detallepedido celeccionado
  componentDidUpdate(prevProps) {
    if (prevProps.idDetallepedido !== this.props.idDetallepedido) {
      Detallepedido.find(this.props.idDetallepedido,null, (prto) => {
        this.setState({ idDetallepedido: prto.id, detallepedido: prto })
      })

    }
  }

  handlercancelar = () => {
    alert('salimos de la ventana')
  }

  handlerEdit = () => {
    alert('Se editará este detallepedido')
  }
  handlerBorrar = () => {
    alert('Se borrará este detallepedido')
  }

  render() {
    let obj = this.state.detallepedido;
    let img='/assets/imgs/detallepedido.svg'
    
    if (this.state.detallepedido) {
        if(obj.producto.urlFoto && obj.producto.urlFoto.length>0 ){
            img=AppSys.urlBase+'/'+ obj.producto.urlFoto
        }
    
      return (
        <Row className="mt-5">
     
          <Col>
            <Card style={{ width: '18rem', marginRight:'auto',marginLeft:'auto' }}>
              <Card.Img variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)' }} />
              <Card.Body>
                <Card.Title>{obj.producto.nombre}</Card.Title>
                <Card.Text>
                  {obj.comentario}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                				<ListGroupItem>Cantidad: {' ' + obj.catidad}</ListGroupItem>
				<ListGroupItem>Fraccion: {' ' + obj.fraccion}</ListGroupItem>
				<ListGroupItem>Monto: {' ' + obj.monto}</ListGroupItem>

              </ListGroup>

              <BotonesCancelEditDel entidad='detallepedido' id={obj.id}></BotonesCancelEditDel>
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

export default PageViewDetallepedido;
  
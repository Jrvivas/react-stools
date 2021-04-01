
import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup, Spinner, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {GeoAlt, GeoFill,Phone, Mailbox, Shop, Telephone} from 'react-bootstrap-icons';
import AppSys from '../../models/app_sys';
import Contacto from '../../models/app_model_contacto';
import BotonesCancelEditDel from '../botones_cancel_edit_del';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/07/2021, 11:25:08 ---



class PageViewContacto extends Component {
  constructor(props) {
    super(props);

    this.state = { idContacto: 0, contacto: null }
  }

  componentWillMount() {
    Contacto.find(this.props.idContacto, null, (prto) => {
      this.setState({ idContacto: prto.id, contacto: prto })
    })
  }


  // cuando se actualise el contacto celeccionado
  componentDidUpdate(prevProps) {
    if (prevProps.idContacto !== this.props.idContacto) {
      Contacto.find(this.props.idContacto, null, (prto) => {
        this.setState({ idContacto: prto.id, contacto: prto })
      })

    }
  }

  handlercancelar = () => {
    alert('salimos de la ventana')
  }

  handlerEdit = () => {
    alert('Se editará este contacto')
  }
  handlerBorrar = () => {
    alert('Se borrará este contacto')
  }

  render() {
    let obj = this.state.contacto;
    let img = '/assets/imgs/contacto.svg'

    if (this.state.contacto) {
      if (obj.urlFoto) {
        img = AppSys.urlBase + '/' + obj.urlFoto
      }
      return (
        <Row className="mt-5">

          <Col>
            <Card style={{ width: '18rem', marginRight: 'auto', marginLeft: 'auto' }}>
              <Card.Img variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)' }} />
              <Card.Body>
                <Card.Title className="truncate">{obj.nombre}</Card.Title>
                <Card.Text className="truncate">
                  <Shop size="24px" color='gray'></Shop> {obj.empresa}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem className="truncate"><GeoAlt size="24px" color='gray'></GeoAlt>Dirección: {' ' + obj.direccion}</ListGroupItem>
                <ListGroupItem className="truncate"><GeoFill size="24px" color='gray'></GeoFill>Localidad: {' ' + obj.localidad}</ListGroupItem>
                <ListGroupItem action={obj.cel.length>6?true:false} variant={obj.cel.length>6?"success":"none"} className="truncate"><Phone size="24px" color='gray'></Phone>Movil: {' ' + obj.cel}</ListGroupItem>
                <ListGroupItem action={obj.tel.length>6?true:false} variant={obj.tel.length>6?"success":"none"} className="truncate"><Telephone size="24px" color='gray'></Telephone>Fijo: {' ' + obj.tel}</ListGroupItem>
                <ListGroupItem action={obj.email.indexOf('@')>-1?true:false} variant={obj.email.indexOf('@')>-1?"success":"none"}className="truncate"><Mailbox size="24px" color='gray'></Mailbox>Email: {' ' + obj.email}</ListGroupItem>

              </ListGroup>
         
              <Link className='m-2 btn btn-outline-primary' to={'/precio-cliente/'+obj.id}> Precios Especiales</Link>
              <Button variant="outline-primary" className="m-2">Compras</Button>
              <Button variant="outline-primary" className="m-2">Cuenta corriente</Button>
              
              <BotonesCancelEditDel entidad='contacto' id={obj.id}></BotonesCancelEditDel>
              
            </Card>
          </Col>

        </Row>

      )
    } else {
      return (
        <Spinner animation="grow" />
      )
    }

  }
}

export default PageViewContacto;

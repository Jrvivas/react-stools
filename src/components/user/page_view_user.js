
import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup,Spinner, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppSys from '../../models/app_sys';
import User from '../../models/app_model_user';
import BotonesCancelEditDel from '../botones_cancel_edit_del';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 04/01/2021, 09:54:43 ---



class PageViewUser extends Component {
  constructor(props) {
    super(props);

    this.state = { idUser: 0, user: null }
  }

  componentWillMount() {
    User.find(this.props.idUser,null, (prto) => {
      this.setState({ idUser: prto.id, user: prto })
    })
  }


  // cuando se actualise el user celeccionado
  componentDidUpdate(prevProps) {
    if (prevProps.idUser !== this.props.idUser) {
      User.find(this.props.idUser,null, (prto) => {
        this.setState({ idUser: prto.id, user: prto })
      })

    }
  }

  handlercancelar = () => {
    alert('salimos de la ventana')
  }

  handlerEdit = () => {
    alert('Se editará este user')
  }
  handlerBorrar = () => {
    alert('Se borrará este user')
  }

  render() {
    let obj = this.state.user;
    let img='/assets/imgs/user.svg'
    
    if (this.state.user) {
        if(obj.user.rlFoto && obj.user.rlFoto.length>0 ){
            img=AppSys.urlBase+'/'+ obj.user.rlFoto
        }
    
      return (
        <Row className="mt-5">
     
          <Col>
            <Card style={{ width: '18rem', marginRight:'auto',marginLeft:'auto' }}>
              <Card.Img variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)' }} />
              <Card.Body>
                <Card.Title>{obj.user.nombre}</Card.Title>
                <Card.Text>
                  {obj.user.role}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                				<ListGroupItem>Estado: {' ' + obj.status}</ListGroupItem>
				<ListGroupItem>Fecha de Acceso: {' ' + obj.fechaAccess}</ListGroupItem>

              </ListGroup>

              <BotonesCancelEditDel entidad='user' id={obj.id}></BotonesCancelEditDel>
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

export default PageViewUser;
  
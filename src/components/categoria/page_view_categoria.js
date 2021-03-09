
import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup,Spinner, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Categoria from '../../models/app_model_categoria';
import AppSys from '../../models/app_sys';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 02/27/2021, 20:13:33 ---



class PageViewCategoria extends Component {
  constructor(props) {
    super(props);

    this.state = { idCategoria: 0, categoria: null }
  }

  componentWillMount() {
    Categoria.find(this.props.idCategoria,null, (prto) => {
      this.setState({ idCategoria: prto.codigo, categoria: prto })
    })
  }


  // cuando se actualise el categoria celeccionado
  componentDidUpdate(prevProps) {
    if (prevProps.idCategoria !== this.props.idCategoria) {
      Categoria.find(this.props.idCategoria,null, (prto) => {
        this.setState({ idCategoria: prto.codigo, categoria: prto })
      })

    }
  }

  handlercancelar = () => {
    alert('salimos de la ventana')
  }

  handlerEdit = () => {
    alert('Se editará este categoria')
  }
  handlerBorrar = () => {
    alert('Se borrará este categoria')
  }

  render() {
    let obj = this.state.categoria;
    let img='/assets/imgs/categoria.svg'

    if (this.state.categoria) {
       if(obj.urlIcono){
          img=AppSys.urlBase+'/'+ obj.urlIcono
        }
      return (
        <Row className="mt-5">
     
          <Col>
            <Card style={{ width: '18rem', marginRight:'auto',marginLeft:'auto' }}>
              <Card.Img variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)' }} />
              <Card.Body>
                <Card.Title>{obj.nombre}</Card.Title>
                <Card.Text>
                  {obj.descripcion}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                				<ListGroupItem>Categoria Codigo: {' ' + obj.codigo}</ListGroupItem>
				<ListGroupItem>Descripción: {' ' + obj.descripcion}</ListGroupItem>

              </ListGroup>
              <ButtonGroup size="lg" className="mb-2">
                <Link to='/categoria/' className='btn btn-primary'>Cancelar </Link>
                <Link to={'/categoria/edit/' + obj.codigo} className='btn btn-success'>edit </Link>
                <Link to={'/categoria/delete/' + obj.codigo} className='btn btn-danger'>Borrar </Link>
              </ButtonGroup>
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

export default PageViewCategoria;
  
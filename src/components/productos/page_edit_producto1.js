import React, { Component, useState} from 'react';
import { Link } from 'react-router-dom';
import {Form,ButtonGroup} from 'react-bootstrap';
import Producto from '../../models/app_model_producto';

/*
class PageEditProducto extends Component {
    constructor(props) {
        super(props);
        this.state = { idProducto: 0, producto: null }
        this.pto=null
    }

    componentWillMount() {
        Producto.find(this.props.idProducto, null, (prto) => {
            this.setState({ idProducto: prto.id, producto: prto })
        })
    }

    handlerChange=(event)=>{
       // alert("Cambio el elemento "+event.target.id)
        let prto=this.state.producto
        prto[event.target.name]=event.target.value
        t

    }
    render() {
        let pto = this.state.producto;
        return (
            <Form>
                <Form.Group controlId={"formGroupCodigo"} >
                    <Form.Label>Codigo</Form.Label>
                    <Form.Control type="text" placeholder="Codigo de barra o propio"  />
                </Form.Group>
                <Form.Group controlId={"formGroupNombre"} >
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre del producto"  />
                </Form.Group>

                <FieldForm entidad={pto} handlerChange={this.handlerChange}></FieldForm>
                
                <ButtonGroup size="lg" className="mb-2">
                    <Link to='/' className='btn btn-primary'>Cancelar </Link> 
                    <Link to={'/edit/'+pto.id} className='btn btn-success'>edit </Link> 
                    <Link to={'/delete/'+pto.id} className='btn btn-danger'>Borrar </Link>
                </ButtonGroup>
            </Form>
        );
    }
}

// funcionde prueba
function FieldForm(props){
    let fields=[]
    let id=1
    if(props.entidad){
       fields= Object.keys(props.entidad).map(field=>{
           return( <Form.Group controlId={"formGroup_"+field} key={id++}>
                    <Form.Label>{field}</Form.Label>
                    <Form.Control type="text" name={field} placeholder={"Ingrese "+ field} onChange={props.handlerChange} />
                </Form.Group>)
        })
    }
    return(fields)
}*/
const PageEditProducto=(props)=>{
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: ''
    })

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.nombre + ' ' + datos.apellido)
    }
    const pto = props.producto;
    return (
        <Form>
                <Form.Group controlId={"formGroupId"} >
                        <Form.Label> ID</Form.Label >
                        <Form.Control type="text" placeholder="ID"/>
                </Form.Group>
                <Form.Group controlId={"formGroupCodigo"} >
                        <Form.Label> Código</Form.Label >
                        <Form.Control type="text" placeholder="Código"/>
                </Form.Group>
                <Form.Group controlId={"formGroupNombre"} >
                        <Form.Label> Nombre</Form.Label >
                        <Form.Control type="text" placeholder="Nombre"/>
                </Form.Group>
                <Form.Group controlId={"formGroupDescripcion"} >
                        <Form.Label> Descripcion</Form.Label >
                        <Form.Control type="text" placeholder="Descripcion"/>
                </Form.Group>
                <Form.Group >
                        <Form.File id="formGroupUrlfoto" label="Foto"/>
                </Form.Group>
                <Form.Group controlId={"formGroupEstado"} >
                        <Form.Label> Estado</Form.Label >
                        <Form.Control as="select">
                                <option value="ACTIVO">Activo</option>
                                <option value="BORRADO">Borrado</option>
                                <option value="SUSPENSO">Suspeso</option>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId={"formGroupPrecio"} >
                        <Form.Label> Precio</Form.Label >
                        <Form.Control type="text" placeholder="Precio"/>
                </Form.Group>
                <Form.Group controlId={"formGroupCosto"} >
                        <Form.Label> Costo</Form.Label >
                        <Form.Control type="text" placeholder="Costo"/>
                </Form.Group>
                <Form.Group controlId={"formGroupUnidad"} >
                        <Form.Label> Unidad</Form.Label >
                        <Form.Control as="select">
                                <option value="ML">Metro linel</option>
                                <option value="UN">Unidad</option>
                                <option value="M3">Metro c├║bico</option>
                                <option value="M2">Metro Cuadrado</option>
                        </Form.Control>
                </Form.Group>
        </Form>
    );
}
   /*<ButtonGroup size="lg" className="mb-2">
                <Link to='/' className='btn btn-primary'>Cancelar </Link> 
                <Link to={'/edit/'+pto.id} className='btn btn-success'>edit </Link> 
                <Link to={'/delete/'+pto.id} className='btn btn-danger'>Borrar </Link>
            </ButtonGroup>*/
export default PageEditProducto;
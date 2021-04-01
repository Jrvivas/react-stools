import { Modal, Form, Card, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import Detallepedido from '../../models/app_model_detallepedido';
import AppSys from '../../models/app_sys';


export default function ModalDetallePedido(props) {
    /*const [datos, setDatos] = useState({
        id: '', cantidad: '', fraccion: '', comentario: '', monto: '', costo: ''
    })*/
    const [datos, setDatos] = useState(new Detallepedido())
    const [producto, setProducto] = useState(props.producto);



    useEffect(() => {
        //componentDidMount
        
            setDatos(props.detalle)
            setProducto(props.producto)
       

        return () => {
            //componentWillUnmount

        };
    }, []);


    const enviarDatosDetalle = (event) => {
        event.preventDefault()
      
        if (props.detalle.validate() == 1) {
            props.handlerAddDetalle(props.detalle)
        } else{
            alert("errores:" + props.detalle.errors.map((e) => e.text+ ' '))
      
              return
        }
    }


    const handleInputChange = (event) => {
       
        
        props.detalle[event.target.name]=event.target.value
        props.detalle.refresh()
        //setDatos({...datos,['costo']:props.detalle.costo} )
       // setDatos({...datos,['monto']:props.detalle.monto})
       setDatos({'monto':props.detalle.monto,'costo':props.detalle.costo})
        
    }

    let img = '/assets/imgs/producto.svg'//'
    if (props.producto && props.producto.urlFoto && props.producto.urlFoto.length > 0) {
        img = AppSys.urlBase + '/' + props.producto.urlFoto
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ props.titulo}</Modal.Title>
            </Modal.Header>
            <Form name='form-detalle-pedido'  onSubmit={enviarDatosDetalle}>
            <Modal.Body>

            
            <Card style={{ maxWidth: '600px', marginRight: 'auto', marginLeft: 'auto' }}>
                <Card.Img id="preview" variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)', maxWidth: '250px', marginLeft: 'auto', marginRight: 'auto' }} />

                <Form.Group controlId={"formGroupCantidad"} >
                    <Form.Label> Cantidad</Form.Label >
                    <Form.Control type="text" name="cantidad" placeholder="Cantidad" onChange={handleInputChange} defaultValue={props.detalle.cantidad != '' ? props.detalle.cantidad : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupFraccion"} >
                    <Form.Label> Formmula</Form.Label >
                    <Form.Control type="text" name="fraccion" placeholder="Fraccion" onChange={handleInputChange} defaultValue={props.detalle.fraccion != '' ? props.detalle.fraccion : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupComentario"} >
                    <Form.Label> Comentario</Form.Label >
                    <Form.Control type="text" name="comentario" placeholder="Comentario" onChange={handleInputChange} defaultValue={props.detalle.comentario != '' ? props.detalle.comentario : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupMonto"} >
                    <Form.Label> Monto</Form.Label >
                    <Form.Control type="text" name="monto" placeholder="Monto" onChange={handleInputChange} value={datos.monto} defaultValue={props.detalle.monto != '' ? props.detalle.monto : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupCosto"} >
                    <Form.Label> Costo</Form.Label >
                   
                    <Form.Control type="text" name="costo" placeholder="Costo" onChange={handleInputChange} value={datos.costo } defaultValue={props.detalle.costo != '' ? props.detalle.costo : ''} />
                </Form.Group>
                </Card>
                

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancelar
                 </Button>
                 <Button type="submit" className='btn btn-success'>
                    Aceptar
                 </Button>

            </Modal.Footer>
            </Form>
        </Modal>)
}
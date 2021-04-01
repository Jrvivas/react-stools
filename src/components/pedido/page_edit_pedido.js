import React, { useState, useEffect } from 'react';
import {Close, Trash} from 'react-bootstrap-icons'
import { Form, Button, ButtonGroup, ListGroup, ListGroupItem, Spinner, Card, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import ImageFile from '../../resources/file_manager';
import AppSys from '../../models/app_sys';
import Pedido from '../../models/app_model_pedido';
import Contacto from '../../models/app_model_contacto'
import ModalList from '../modal_lista'

import Producto from '../../models/app_model_producto';
import Detallepedido from '../../models/app_model_detallepedido';
import ModalDetallePedido from '../detallepedido/modal_edit_detallepedido';
import Format from '../../resources/util'


//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/16/2021, 18:22:17 ---


/**
*Pagina que edita lo valores de Pedido seleccionado
*@param obj props propiedades pasadas (props.idPedido)
*/
const PageEditPedido = (props) => {
    const [datos, setDatos] = useState({
        foto: '', id: '', contacto_id: '', idResponsable: '', idModifico: '', fechaIni: Format.nowDate(), fechaEntrega: Format.nowDate(), Delivery: '', comentario: '', monto: '', pago: '', saldo: '', descuento: '', impuesto: '', estado: '', prioridad: '', detalles: []
    })

    const [estado, setEstado] = useState('NORMAL');

    //--- estado generados
    const [tituloModal,setTituloModal]=useState('Cliente')
    const [tituloModalDetalle,setTituloModalDetalle]=useState('Nuevo Detalle')
   
    const [newDetalle,setNewDetalle]=useState(new Detallepedido())
    const [detalles,setDetalles]=useState([])

    const [contactos, setListContactos] = useState([]);
    const [listaBuscar, setListaBuscar] = useState([]);         //FALTA EN P^LANTILLA
    const [contactoFiltrado, setContactoFiltrada] = useState([])   //FALTA EN PLANTILLA???



    //---- Para detalle
    const [productos, setListProductos] = useState([]);
    const [producto, setProducto] = useState(null);

    const [contacto, setContacto] = useState(null);
    const [show, setShow] = useState(false);
    const [showDetalle, setShowDetalle] = useState(false);

    const history = useHistory();

    useEffect(() => {
        //componentDidMount
        Pedido.find(props.idPedido, null, (rta) => {
            setDatos(rta)
        })

        return () => {
            //componentWillUnmount

        };
    }, []);

    //--Metodos generados
    const handleShow = () => setShow(true);
    const handleShowDetalle = () => setShowDetalle(true);
    const handleClose = () => {setShow(false);setShowDetalle(false)}

    //-------------Para detalle
    const handleShowProducto = () => {
        setTituloModal('Producto')
        setEstado('FIND-PRODUCTO')
        setShow(true)
        setListaBuscar([])
       //  Producto.getList("ALL",contacto?contacto.id:0, (rst) => {
        Producto.getList("ALL",0, (rst) => {
            setListProductos(rst)
            setListaBuscar(rst)
        })
    }

    const handleShowContacto = () => {
        
        setTituloModal('Cliente')
        setEstado('FIND-CONTACTO')
        setShow(true)
        setListaBuscar([])

        Contacto.getList("ALL", (rst) => {
            setListContactos(rst)
            setListaBuscar(rst)
        })
    }
    const handlerTextSearch = (event) => {
        if (estado=='FIND-CONTACTO'){
           setListaBuscar(contactos.filter((c) => { return (c.nombre.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) })) 
        }
        if (estado=='FIND-PRODUCTO'){
           setListaBuscar(productos.filter((c) => { return (c.nombre.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) })) 
        }
    }


    //Cuando seleccionamos un elemento de las lista ya sea un cliente o un producto
    const handleSelect = (event) => {
       
        let cat =listaBuscar[event.currentTarget.id]
        if (estado=='FIND-CONTACTO'){
          
             //setDatos({ ...datos, ['contacto_id_id']: cat.id })  CORREGIR
             setDatos({ ...datos, ['contacto_id']: cat.id })
            //setContacto_Id(cat)   CORREGIR
            setContacto(cat)
        }
        if (estado=='FIND-PRODUCTO'){
             setProducto(cat)
             let det=new Detallepedido()
             det.producto=cat
             setNewDetalle(det)
             
             setShowDetalle(true);
             //abrir la ventana de edicion de detalle
        }
        setEstado("NORMAL")
         
        setShow(false);
    }


    const handleAddNewDetalle=(det)=>{
        let dets=detalles
        dets.push(det)
        setDetalles(dets)
        setShowDetalle(false)
    }


    const handleInputChange = (event) => {
        if (event.target.files) {
            mostrarImagen(event)
        }

        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }


    const handleAddDetalle=(event)=>{
        handleShowProducto()
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        if(event.target.name=='form-detalle-pedido') return

        console.log('enviando datos...' + datos.foto + ' ' + datos.id + ' ' + datos.contacto_id + ' ' + datos.idResponsable + ' ' + datos.idModifico + ' ' + datos.fechaIni + ' ' + datos.fechaEntrega + ' ' + datos.Delivery + ' ' + datos.comentario + ' ' + datos.monto + ' ' + datos.pago + ' ' + datos.saldo + ' ' + datos.descuento + ' ' + datos.impuesto + ' ' + datos.estado + ' ' + datos.prioridad + ' ' + datos.detalles + ' ')

        if (estado === 'NORMAL') {
            let obj = new Pedido()
            obj.fromJson(datos)

            
            if (obj.validate() == 1) {

                obj.save(() => {
                    setEstado('TERMINADO')
                    history.push("/pedido/");
                })
            } else {
                alert("errores:" + obj.errors.map((e) => e.text))
                setEstado('NORMAL')
                return
            }
           
        }

        setEstado('ENVIADO')
    }


    //const pto = props.producto;

    let img = '/assets/imgs/contacto.svg'
    if (contacto && contacto.urlFoto && contacto.urlFoto.length > 0) {  // Modificar la plantilla
        img = AppSys.urlBase + '/' + contacto.urlFoto
    }
    return (
        <Form  name='form-pedido' onSubmit={enviarDatos}>
            <Card style={{ maxWidth: '600px', marginRight: 'auto', marginLeft: 'auto' }}>
                <Card.Img id="preview" variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)', maxWidth: '250px', marginLeft: 'auto', marginRight: 'auto' }} />
               
                <Form.Group controlId={"formGroupId"} >
                    <Form.Label> Id</Form.Label >
                    <Form.Control type="text" name="id" placeholder="Id" onChange={handleInputChange} defaultValue={datos.id != '' ? datos.id : ''} />
                </Form.Group>
                
                <Form.Group controlId={"formGroupFechaIni"} >
                    <Form.Label> Fecha de Pedido</Form.Label >
                    <Form.Control type="date" name="fechaIni" placeholder="Fecha" onChange={handleInputChange} defaultValue={datos.fechaIni != '' ? datos.fechaIni : ''} />
                </Form.Group>

                <Form.Group controlId={"formGroupFechaEntrega"} >
                    <Form.Label> Fecha de Entrega</Form.Label >
                    <Form.Control type="date" name="fechaEntrega" placeholder="Fecha" onChange={handleInputChange} defaultValue={datos.fechaEntrega != '' ? datos.fechaEntrega : ''} />
                </Form.Group>

                <Button  variant="primary" onClick={handleShowContacto}>
                    {contacto?contacto.nombre:'Seleccionar Cliente'}
		        </Button>
                <Form.Group controlId={"formGroupComentario"} >
                    <Form.Label> Comentario</Form.Label >
                    <Form.Control type="text" name="comentario" placeholder="Comentario" onChange={handleInputChange} defaultValue={datos.comentario != '' ? datos.comentario : ''} />
                </Form.Group>
              
              
                <Card border="primary" style={{borderColor:"var(--app-ctr-bg-color)"}}>
                <Card.Header  style={{background: ' var(--app-ctr-bg-color)',color:'var(--app-ctr-text-color)'}}>Detalles del Pedido</Card.Header>
                <Card.Body>
                <ListGroup style={{overflow:'scroll',height:'300px'}}>

                    {
                        detalles.map((d,idx)=>{
                            return(
                                <ListGroup.Item  key={idx} variant="info">
                                    <Row>
                                        <Col className='truncate' style={{ fontSize: '0.8em', padding: '1px' }}>
                                            {d.cantidad+' - ('+d.producto.nombre+')'+d.comentario}
                                        </Col>
                                        <Col xs={4} md={3}>
                                            ${d.monto}
                                        </Col>
                                        <Col xs={1} md={1}>
                                            <Trash size='24' style={{ float: 'right' }}></Trash>
                                        </Col>

                                    </Row>

                                </ListGroup.Item>
                            )                        })
                    }


                    </ListGroup>
                   <Button className='mt-2' variant="primary" style={{float:'right'}} onClick={handleAddDetalle}>Agregar detalle</Button>
                </Card.Body>
                </Card>

                <Form.Group controlId={"formGroupMonto"} >
                    <Form.Label> Monto</Form.Label >
                    <Form.Control type="text" name="monto" placeholder="Monto" onChange={handleInputChange} defaultValue={datos.monto != '' ? datos.monto : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupPago"} >
                    <Form.Label> Pago</Form.Label >
                    <Form.Control type="text" name="pago" placeholder="Pago" onChange={handleInputChange} defaultValue={datos.pago != '' ? datos.pago : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupSaldo"} >
                    <Form.Label> Saldo</Form.Label >
                    <Form.Control type="text" name="saldo" placeholder="Saldo" onChange={handleInputChange} defaultValue={datos.saldo != '' ? datos.saldo : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupDescuento"} >
                    <Form.Label> Descuento</Form.Label >
                    <Form.Control type="text" name="descuento" placeholder="Descuento" onChange={handleInputChange} defaultValue={datos.descuento != '' ? datos.descuento : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupImpuesto"} >
                    <Form.Label> Impuesto</Form.Label >
                    <Form.Control type="text" name="impuesto" placeholder="Impuesto" onChange={handleInputChange} defaultValue={datos.impuesto != '' ? datos.impuesto : ''} />
                </Form.Group>

                <Form.Group controlId={"formGroupEstado"} >
                        <Form.Label> Estado</Form.Label >
                        <Form.Control as="select"  name="estado"  onChange={handleInputChange} defaultValue={datos.estado!=''?datos.estado:''} >
                                <option value="ESPERA">Espera</option>
                                <option value="PRESUPUESTO">Presupuesto</option>
                                <option value="DISENIO">Diseño</option>
                                <option value="PROCESO">Proceso</option>
                                <option value="TERMINADO">Terminado</option>
                                <option value="EMTREGADO">Entregado</option>
                                <option value="RECHAZADO">Rechazado</option>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId={"formGroupPrioridad"} >
                        <Form.Label> Prioridad</Form.Label >
                        <Form.Control as="select"  name="prioridad"  onChange={handleInputChange} defaultValue={datos.prioridad!=''?datos.prioridad:''} >
                                <option value="BAJA">Baja</option>
                                <option value="NORMAL">Normal</option>
                                <option value="MEDIA">Media</option>
                                <option value="ALTA">Alta</option>
                        </Form.Control>
                </Form.Group>

                <ButtonGroup size="lg" className="mb-2">
                    <Link to='/pedido/' className='btn btn-primary'>Cancelar </Link>
                    <Button type="submit" className='btn btn-success'><Spinner animation="border" style={{ display: estado != 'ENVIADO' ? 'none' : 'inline-block' }} />Aceptar</Button>
                </ButtonGroup>

                <ModalList titulo={tituloModal} lista={listaBuscar} handlerTextSearch={handlerTextSearch} handleSelect={handleSelect} handleClose={handleClose} show={show}></ModalList>
                <ModalDetallePedido titulo={tituloModalDetalle} detalle={newDetalle} producto={producto} handleClose={handleClose} show={showDetalle} handlerAddDetalle={handleAddNewDetalle}></ModalDetallePedido>


            </Card>
        </Form>

    );
}
function mostrarImagen(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = document.getElementById('preview');
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

export default PageEditPedido;
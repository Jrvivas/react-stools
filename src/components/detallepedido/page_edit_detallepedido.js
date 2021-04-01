import React, { useState, useEffect } from 'react';
import { Form, Button, ButtonGroup, Image, Spinner, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import ImageFile from '../../resources/file_manager';
import AppSys from '../../models/app_sys';
import Detallepedido from '../../models/app_model_detallepedido';
import Producto from '../../models/app_model_producto';


//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/25/2021, 15:03:18 ---


/**
*Pagina que edita lo valores de Detallepedido seleccionado
*@param obj props propiedades pasadas (props.idDetallepedido)
*/
const PageEditDetallepedido = (props) => {
    const [datos, setDatos] = useState({
        foto: '', id: '', producto: '', cantidad: '', fraccion: '', comentario: '', monto: '', costo: ''
    })

    const [estado, setEstado] = useState('NORMAL');

    //--- estado generados
    const [productos, setListProductos] = useState([]);
    const [producto, setProducto] = useState(null);
    const [show, setShow] = useState(false);


    const history = useHistory();

    useEffect(() => {
        //componentDidMount
        Detallepedido.find(props.idDetallepedido, null, (rta) => {
            setDatos(rta)
        })

        return () => {
            //componentWillUnmount

        };
    }, []);

    //--Metodos generados
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShowProducto = () => {
        setShow(true)
        Producto.getList("ALL", (rst) => {
            setListProductos(rst)
            setProductoFiltrada(rst)
        })
    }
    const handlerTextSearch = (event) => {
        setListaBuscar(entidades.filter((c) => { return (c.nombre.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) }))
    }
    const handleSelect = (event) => {
        let cat = listaBuscar[event.target.id]
        setDatos({ ...datos, ['producto_id']: cat.id })
        setProducto(cat)
        setShow(false);
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

    const enviarDatos = (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.foto + ' ' + datos.id + ' ' + datos.producto + ' ' + datos.cantidad + ' ' + datos.fraccion + ' ' + datos.comentario + ' ' + datos.monto + ' ' + datos.costo + ' ')

        if (estado === 'NORMAL') {
            let obj = new Detallepedido()
            obj.fromJson(datos)



            if (obj.validate() == 1) {

                obj.save(() => {
                    setEstado('TERMINADO')
                    history.push("/detallepedido/");
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

    let img = '/assets/imgs/detallepedido.svg'//'
    if (datos.urlFoto && datos.urlFoto.length > 0) {
        img = AppSys.urlBase + '/' + datos.urlFoto
    }
    return (
        <Form onSubmit={enviarDatos}>
            <Card style={{ maxWidth: '600px', marginRight: 'auto', marginLeft: 'auto' }}>
                <Card.Img id="preview" variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)', maxWidth: '250px', marginLeft: 'auto', marginRight: 'auto' }} />
                <Form.Group controlId={"formGroupId"} >
                    <Form.Label> Id</Form.Label >
                    <Form.Control type="text" name="id" placeholder="Id" onChange={handleInputChange} defaultValue={datos.id != '' ? datos.id : ''} />
                </Form.Group>
                <Button variant="primary" onClick={handleShowProducto}>
                    Seleccionar Producto
		</Button>
                <Form.Group controlId={"formGroupCantidad"} >
                    <Form.Label> Cantidad</Form.Label >
                    <Form.Control type="text" name="cantidad" placeholder="Cantidad" onChange={handleInputChange} defaultValue={datos.cantidad != '' ? datos.cantidad : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupFraccion"} >
                    <Form.Label> Fraccion</Form.Label >
                    <Form.Control type="text" name="fraccion" placeholder="Fraccion" onChange={handleInputChange} defaultValue={datos.fraccion != '' ? datos.fraccion : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupComentario"} >
                    <Form.Label> Comentario</Form.Label >
                    <Form.Control type="text" name="comentario" placeholder="Comentario" onChange={handleInputChange} defaultValue={datos.comentario != '' ? datos.comentario : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupMonto"} >
                    <Form.Label> Monto</Form.Label >
                    <Form.Control type="text" name="monto" placeholder="Monto" onChange={handleInputChange} defaultValue={datos.monto != '' ? datos.monto : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupCosto"} >
                    <Form.Label> Costo</Form.Label >
                    <Form.Control type="text" name="costo" placeholder="Costo" onChange={handleInputChange} defaultValue={datos.costo != '' ? datos.costo : ''} />
                </Form.Group>

                <ButtonGroup size="lg" className="mb-2">
                    <Link to='/detallepedido/' className='btn btn-primary'>Cancelar </Link>
                    <Button type="submit" className='btn btn-success'><Spinner animation="border" style={{ display: estado === 'NORMAL' ? 'none' : 'inline-block' }} />Aceptar</Button>
                </ButtonGroup>

                <ModalList entidad={entidad} lista={listaBuscar} handlerTextSearch={handlerTextSearch} handleSelect={handleSelect} handleClose={handleClose} show={show}></ModalList>


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

export default PageEditDetallepedido;
import React, { useState, useEffect } from 'react';
import { Form, Button, ButtonGroup, Image, Spinner, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import ImageFile from '../../resources/file_manager';
import AppSys from '../../models/app_sys';
import Contacto from '../../models/app_model_contacto';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/07/2021, 11:25:08 ---


/**
*Pagina que edita lo valores de Contacto seleccionado
*@param obj props propiedades pasadas (props.idContacto)
*/
const PageEditContacto = (props) => {
    const [datos, setDatos] = useState({
        urlFoto: '', id: '', nombre: '', direccion: '', localidad: '', empresa: '', cuit: '', cel: '', tel: '', email: '', cliente: '', proveedor: '', operador: '', carpeta: ''
    })

    const [estado, setEstado] = useState('NORMAL');

    const history = useHistory();

    useEffect(() => {
        //componentDidMount
        Contacto.find(props.idContacto, null, (rta) => {
            setDatos(rta)
        })

        return () => {
            //componentWillUnmount

        };
    }, []);

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

        console.log('enviando datos...' + datos.urlFoto + ' ' + datos.id + ' ' + datos.nombre + ' ' + datos.direccion + ' ' + datos.localidad + ' ' + datos.empresa + ' ' + datos.cuit + ' ' + datos.cel + ' ' + datos.tel + ' ' + datos.email + ' ' + datos.cliente + ' ' + datos.proveedor + ' ' + datos.operador + ' ' + datos.carpeta + ' ')

        //+Poner pantalla protectora con TODO

        if (estado === 'NORMAL') {

            let obj = new Contacto()
            obj.fromJson(datos)

            obj.app_idApp = AppSys.sesion.idApp

            //guardar imagen si hay
            let fileFoto = document.querySelector("#formGroupUrlfoto").files[0]
            if (fileFoto) {
                ImageFile.downloadImg(fileFoto, 'CONTACTO_' + obj.id, (url) => {
                    if (url.url) {
                        obj.urlFoto = url.url
                    } else {
                        alert(url)
                        obj.urlFoto = ''
                    }

                    if (obj.validate() == 1) {

                        obj.save(() => {
                            setEstado('TERMINADO')
                            history.push("/contacto/");
                        })
                    } else {
                        alert("errores:" + obj.errors.map((e) => e.text))
                        setEstado('NORMAL')
                        return
                    }
                })
            } else {
                if (obj.validate() == 1) {

                    obj.save(() => {
                        setEstado('TERMINADO')
                        history.push("/contacto/");
                    })
                } else {
                    alert("errores:" + obj.errors.map((e) => e.text))
                    setEstado('NORMAL')
                    return
                }
            }

        }

        setEstado('ENVIADO')
    }


    //const pto = props.producto;

    let img = '/assets/imgs/contacto.svg'//'
    if (datos.urlFoto) {
        img = AppSys.urlBase + '/' + datos.urlFoto
    }
    return (
        <Form onSubmit={enviarDatos}>
            <Card style={{ maxWidth: '600px', marginRight: 'auto', marginLeft: 'auto' }}>
                <Card.Img id="preview" variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)', maxWidth: '250px', marginLeft: 'auto', marginRight: 'auto' }} />
                <Form.Group >
                    <Form.File id="formGroupUrlfoto" name="urlFoto" label="Foto" onChange={handleInputChange} defaultValue={datos.urlFoto != '' ? datos.urlFoto : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupId"} >
                    <Form.Label> ID</Form.Label >
                    <Form.Control type="text" name="id" placeholder="ID" onChange={handleInputChange} defaultValue={datos.id != '' ? datos.id : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupNombre"} >
                    <Form.Label> Nombre</Form.Label >
                    <Form.Control type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} defaultValue={datos.nombre != '' ? datos.nombre : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupDireccion"} >
                    <Form.Label> Dirección</Form.Label >
                    <Form.Control type="text" name="direccion" placeholder="Dirección" onChange={handleInputChange} defaultValue={datos.direccion != '' ? datos.direccion : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupLocalidad"} >
                    <Form.Label> Localidad</Form.Label >
                    <Form.Control type="text" name="localidad" placeholder="Localidad" onChange={handleInputChange} defaultValue={datos.Localidad != '' ? datos.localidad : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupEmpresa"} >
                    <Form.Label> Empresa</Form.Label >
                    <Form.Control type="text" name="empresa" placeholder="Empresa" onChange={handleInputChange} defaultValue={datos.empresa != '' ? datos.empresa : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupCuit"} >
                    <Form.Label> C.U.I.T.</Form.Label >
                    <Form.Control type="text" name="cuit" placeholder="C.U.I.T." onChange={handleInputChange} defaultValue={datos.cuit != '' ? datos.cuit : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupCel"} >
                    <Form.Label> Celular</Form.Label >
                    <Form.Control type="text" name="cel" placeholder="Celular" onChange={handleInputChange} defaultValue={datos.cel != '' ? datos.cel : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupTel"} >
                    <Form.Label> Teléfono fijo</Form.Label >
                    <Form.Control type="text" name="tel" placeholder="Teléfono fijo" onChange={handleInputChange} defaultValue={datos.tel != '' ? datos.tel : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupEmail"} >
                    <Form.Label> Email</Form.Label >
                    <Form.Control type="text" name="email" placeholder="Email" onChange={handleInputChange} defaultValue={datos.email != '' ? datos.email : ''} />
                </Form.Group>
                <Form.Group controlId={"formGroupCliente"} >
                    <Form.Label> Es Cliente</Form.Label >
                    <Form.Control as="select" name="cliente" onChange={handleInputChange} defaultValue={datos.cliente != '' ? datos.cliente : ''} >
                        <option value="SI">Si</option>
                        <option value="NO">No</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId={"formGroupProveedor"} >
                    <Form.Label> Es Proveedor</Form.Label >
                    <Form.Control as="select" name="proveedor" onChange={handleInputChange} defaultValue={datos.proveedor != '' ? datos.proveedor : ''} >
                        <option value="SI">Si</option>
                        <option value="NO">No</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId={"formGroupOperador"} >
                    <Form.Label> Es Operador</Form.Label >
                    <Form.Control as="select" name="operador" onChange={handleInputChange} defaultValue={datos.operador != '' ? datos.operador : ''} >
                        <option value="SI">Si</option>
                        <option value="NO">No</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId={"formGroupCarpeta"} >
                    <Form.Label> Carpeta </Form.Label >
                    <Form.Control type="text" name="carpeta" placeholder="Carpeta " onChange={handleInputChange} defaultValue={datos.carpeta != '' ? datos.carpeta : ''} />
                </Form.Group>

                <ButtonGroup size="lg" className="mb-2">
                    <Link to='/contacto/' className='btn btn-primary'>Cancelar </Link>
                    <Button type="submit" className='btn btn-success'><Spinner animation="border" style={{ display: estado === 'NORMAL' ? 'none' : 'inline-block' }} />Aceptar</Button>
                </ButtonGroup>
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

export default PageEditContacto;
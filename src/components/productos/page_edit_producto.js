import React, { useState, useEffect } from 'react';
import { Form, Button, ButtonGroup, Alert, Spinner, Card, Modal, ListGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Categoria from '../../models/app_model_categoria';
import Producto from '../../models/app_model_producto';
import AppSys from '../../models/app_sys';
import ImageFile from '../../resources/file_manager';

var fileFoto = null

const PageEditProducto = (props) => {
    const [datos, setDatos] = useState({
        id: '', app_idApp: '', codigo: '', nombre: '', descripcion: '', urlFoto: '', estado: '', precio: '', costo: '', tiempo: '0', unidad: 'UN', categoriaCodigo: ''
    })
    const [estado, setEstado] = useState('NORMAL');
    const [show, setShow] = useState(false);

    const [textoSearchCategoria, setTextSeachCategoria] = useState('');
    const [categoriaFiltrada, setCategoriaFiltrada] = useState([]);

    const [categorias, setListCategorias] = useState([]);
    const [categoria, setCategoria] = useState(null);
    const unidades = [{ key: 'UN', label: 'Unidad' }, { key: 'ML', label: 'Metro Lineal' }, { key: 'M2', label: 'Metro Cuadrado' }, { key: 'M3', label: 'Metro cúbico' },]

    useEffect(() => {
        //componentDidMount
        if (props.idProducto == 0) {
            setDatos({ ...datos, ['app_idApp']: AppSys.sesion.idApp })

        } else {
            Producto.find(props.idProducto, null, (prto) => {
                setDatos(prto)
                if (prto.categoriaCodigo != '') {
                    Categoria.find(prto.categoriaCodigo, null, (rst) => {
                        if (rst) {
                            setCategoria(rst)

                        }

                    })
                }
            })
        }



        return () => {
            //componentWillUnmount

        };
    }, []);

    const history = useHistory();

    const handleInputChange = (event) => {
        if (event.target.files) {
            mostrarImagen(event)
            fileFoto = event.target.files[0]
        }
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handlerTextSearchCategoria = (event) => {
        setCategoriaFiltrada(categorias.filter((c) => { return (c.nombre.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) }))
        // setTextSeachCategoria(event.target.value)

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowCategorias = () => {
        setShow(true)
        Categoria.getList('ALL', (rst) => {
            setListCategorias(rst)
            setCategoriaFiltrada(rst)
        })
    }

    const handleSelectCategoria = (event) => {

        //let cat=categorias.filter((c)=>{return  c.nombre.toLowerCase().indexOf(textoSearchCategoria.toLowerCase()) > -1})[event.target.id]
        let cat = categoriaFiltrada[event.target.id]
        setDatos({ ...datos, ['categoriaCodigo']: cat.codigo })

        setCategoria(cat)
        setShow(false);
    }
    /**
     * Envia los datos al servidor
     * @param {event} event 
     */
    const enviarDatos = (event) => {
        event.preventDefault()

        console.log('enviando datos...' + datos.id + ' ' + datos.codigo + ' ' + datos.nombre + ' ' + datos.descripcion + ' ' + datos.urlFoto + ' ' + datos.estado + ' ' + datos.precio + ' ' + datos.costo + ' ' + datos.unidad + ' ' + datos.categoria_codigo + ' ')

        //+Poner pantalla protectora con TODO

        if (estado === 'NORMAL') {
            let prto = new Producto()
            prto.fromJson(datos)

            prto.app_idApp = AppSys.sesion.idApp

            //guardar imagen si hay
            fileFoto = document.querySelector("#formGroupUrlfoto").files[0]
            if (fileFoto) {
                ImageFile.downloadImg(fileFoto, 'PROD_' + prto.id, (url) => {
                    if (url.url) {
                        prto.urlFoto = url.url
                    } else {
                        alert(url)
                        prto.urlFoto = ''
                    }

                    prto.save(() => {
                        setEstado('TERMINADO')
                        history.push("/producto/");
                    })
                })
                //obtener el url de la imagen

            } else {
                //guardar el producto 
                prto.save(() => {
                    setEstado('TERMINADO')
                    history.push("/producto/");
                })
            }


        }

        setEstado('ENVIADO')
    }


    let img = '/assets/imgs/producto.svg'//'/logo192.png'
    if (datos.urlFoto) {
        img = AppSys.urlBase + '/' + datos.urlFoto
    }
    return (

        <Form onSubmit={enviarDatos} className='mt-2'>
            <Card style={{ maxWidth: '600px', marginRight: 'auto', marginLeft: 'auto' }}>
                <Card.Img id="preview" variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)', maxWidth: '250px', marginLeft: 'auto', marginRight: 'auto' }} />
                <Form.Group >
                    <Form.File id="formGroupUrlfoto" name="urlFoto" label="Foto" onChange={handleInputChange} defaultValue={datos.urlFoto != '' ? datos.urlFoto : ''} />
                </Form.Group>
                <Card.Body>



                    <Form.Group controlId={"formGroupCodigo"} >
                        <Form.Label> Codigo</Form.Label >
                        <Form.Control type="text" name="codigo" placeholder="Codigo" onChange={handleInputChange} defaultValue={datos.codigo != '' ? datos.codigo : ''} />
                    </Form.Group>
                    <Form.Group controlId={"formGroupNombre"} >
                        <Form.Label> Nombre</Form.Label >
                        <Form.Control type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} defaultValue={datos.nombre != '' ? datos.nombre : ''} />
                    </Form.Group>
                    <Form.Group controlId={"formGroupDescripcion"} >
                        <Form.Label> Descripcion</Form.Label >
                        <Form.Control type="text" name="descripcion" placeholder="Descripcion" onChange={handleInputChange} defaultValue={datos.descripcion != '' ? datos.descripcion : ''} />
                    </Form.Group>

                    <Form.Group controlId={"formGroupEstado"} >
                        <Form.Label> Estado</Form.Label >
                        <Form.Control as="select" name="estado" onChange={handleInputChange} defaultValue={datos.estado != '' ? datos.estado : ''} >
                            <option value="ACTIVO">Activo</option>
                            <option value="BORRADO">Borrado</option>
                            <option value="SUSPENSO">Suspeso</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={"formGroupPrecio"} >
                        <Form.Label> Precio</Form.Label >
                        <Form.Control type="text" name="precio" placeholder="Precio" onChange={handleInputChange} defaultValue={datos.precio != '' ? datos.precio : ''} />
                    </Form.Group>
                    <Form.Group controlId={"formGroupCosto"} >
                        <Form.Label> Costo</Form.Label >
                        <Form.Control type="text" name="costo" placeholder="Costo" onChange={handleInputChange} defaultValue={datos.costo != '' ? datos.costo : ''} />
                    </Form.Group>
                    <Form.Group controlId={"formGroupTiempo"} >
                        <Form.Label> Tiempo</Form.Label >
                        <Form.Control type="text" name="tiempo" placeholder="Tiempo" onChange={handleInputChange} defaultValue={datos.tiempo != '' ? datos.tiempo : '0'} />
                    </Form.Group>

                    <Button variant="primary" onClick={handleShowCategorias}>
                        Seleccionar las categoria
                    </Button>

                    <Alert variant='info'>
                        {categoria ? categoria.nombre : 'Sin categoria'}
                    </Alert>
                    <Form.Group controlId={"formGroupUnidad"} >
                        <Form.Label> Unidad</Form.Label >
                        <Form.Control as="select" name="unidad" onChange={handleInputChange} defaultValue={datos.unidad != '' ? datos.unidad : 'UN'} >
                            {unidades.map((u) => {
                                let sel = false
                                if (datos.unidad == u.key) {
                                    sel = true
                                }

                                return (<option value={u.key} selected={sel}>{u.label}</option>)
                            })}

                        </Form.Control>
                    </Form.Group>


                    <ButtonGroup size="lg" className="mb-2">
                        <Link to='/producto/' className='btn btn-primary'>Cancelar </Link>
                        <Button type="submit" className='btn btn-success'><Spinner animation="border" style={{ display: estado === 'NORMAL' ? 'none' : 'inline-block' }} />Aceptar.</Button>
                    </ButtonGroup>

                </Card.Body>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Seleccione una categoria</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Control type="text" placeholder="Buscar categoria" onKeyUp={handlerTextSearchCategoria} />
                        <Form.Text className="text-serch" ></Form.Text>

                        <ListGroup variant="flush" style={{ height: '200px', overflow: 'auto' }}>
                            {categoriaFiltrada.map((c, idx) => {
                                return (<ListGroup.Item key={idx} id={idx} onClick={handleSelectCategoria}>{c.nombre}</ListGroup.Item>)
                            })}

                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>

                    </Modal.Footer>
                </Modal>

            </Card>
        </Form>
    );
}
/*
<Form.Group controlId={"formGroupId"} >
<Form.Label> ID</Form.Label >
<Form.Control type="text" name="id" placeholder="ID" onChange={handleInputChange} defaultValue={datos.id != '' ? datos.id : ''} />
</Form.Group>*/
function mostrarImagen(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = document.getElementById('preview');
        fileFoto = event.target.result
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

export default PageEditProducto;
import {Modal, Form,Image, ListGroup, Button, Row, Col} from 'react-bootstrap'
import AppSys from '../models/app_sys'

export default function ModalList(props){

return(<Modal show={props.show} onHide={props.handleClose}>
<Modal.Header closeButton>
    <Modal.Title>{' Lista de '+props.titulo}</Modal.Title>
</Modal.Header>
<Modal.Body>

    <Form.Control type="text" placeholder={"Buscar "+props.titulo} onKeyUp={props.handlerTextSearch} />
    <Form.Text className="text-serch" ></Form.Text>

    <ListGroup variant="flush" style={{ height: '300px', overflow: 'auto' }}>
        {props.lista.map((c, idx) => {

           let img = '/assets/imgs/contacto.svg'

           let descripcion=c.empresa

           if(props.titulo.toLowerCase()=='producto'){
               img = '/assets/imgs/producto.svg'
               descripcion=c.descripcion
           }

           if (c.urlFoto && c.urlFoto.length > 0) {  // Modificar la plantilla
               img = AppSys.urlBase + '/' + c.urlFoto
           }

            return (<ListGroup.Item key={idx} id={idx} onClick={props.handleSelect} style={{padding: '0.1rem 0.5rem'}}>
                <Row>
                    <Col xs={2}> 
                    <Image src={img} style={{width:'40px',height:'40px',background:'var(--app-ctr-bg-color)'}} roundedCircle />
                    </Col>
                    <Col xs={10}style={{fontSize:'0.7em'}} >
                     <h5 className='truncate' id={idx}>{c.nombre}</h5>
                     <p className='truncate' >{descripcion}</p>
                    </Col>
                </Row>

                </ListGroup.Item>)
        })}

    </ListGroup>
</Modal.Body>
<Modal.Footer>
    <Button variant="secondary" onClick={props.handleClose}>
        Cancelar
    </Button>

</Modal.Footer>
</Modal>)
}
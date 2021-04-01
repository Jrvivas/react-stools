import { useState,useEffect } from "react";
import { Col, Row,ListGroup,Spinner } from "react-bootstrap";
import Producto from "../../models/app_model_producto"
import BarraBusqueda from "../../components/barra_busqueda_component"

export default function PagePreciosCliente(props){

    const [cliente,setCliente]=useState(null)
    const [precios,setPrecios]=useState([])
    useEffect(() => {
       //Obtener la lista de precios del cliente
       Producto.getList('PRECIOS',props.idCliente,(prcs)=>{
           if(prcs){
               setPrecios(prcs)
           }
            
       })
       return () => {
        //componentWillUnmount

            };
        }, []);



      const handlerFiltroChange=(event)=>{

      }
    
    return(<div>
        <BarraBusqueda titulo="Precios Especiales" handlertextChange={handlerFiltroChange} pathBack={'/contacto/view/'+props.idCliente}></BarraBusqueda>
        <ListPrecios precios={precios}></ListPrecios>

    </div>)
}


function ListPrecios(props){
    const handlerSelect=(event)=>{

    }
    return(
        <ListGroup>
            {
                props.precios.length>0?
                props.precios.map((p,idx)=>{
                    //return(<ItemPrecio key={idx} precio={p}/>)
                    return( <Row key={idx} >
                        <Col>{p.producto}</Col>
                        <Col>{p.precio}</Col>
                        <Col>{p.precio_especial}</Col>
                    </Row>)
                })
                :
                <Spinner animation="border" role="status">
                    <span className="sr-only my-auto">Loading...</span>
                </Spinner>
            }
        </ListGroup>
    )
}


function ItemPrecio(props){
    return(
        <Row>
            <Col>{props.producto}</Col>
            <Col>{props.precio}</Col>
            <Col>{props.precio_especial}</Col>
        </Row>
    )
}
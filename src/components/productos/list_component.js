import React, { Component } from 'react';
import { ListGroup,Row,Col, Image} from "react-bootstrap";
import {Link } from 'react-router-dom';
import AppSys from '../../models/app_sys';

const StyledLink = {
    textDecoration: 'none',
    color:'var(--app-ctr-bg-color)'
};


class ListaProductos extends Component {
    
    constructor(props) {
        super(props);
        this.state ={ productos:this.props.productos}
       
    }
    componentDidUpdate(prevProps) {
        if (prevProps.productos !== this.props.productos) {
            this.setState({productos:this.props.productos})
        }
      }

    handlerSelect=(pto)=>{
        
    }


    render() { 
        return ( <ListGroup>{
            this.state.productos.map((prto)=>{
               return(<ItemProducto key={prto.id} producto={prto} selectHandler={this.handlerSelect}/>)
              
            })
           }</ListGroup> );
    }
}




/**
 * Item de producto
 */
class ItemProducto extends React.Component {
    styleBot = {
        borderRadius: '5px',
        border:'solid 1px var(--app-ctr-bg-color) ',
        margin: '2px 4px 2px  -35px',
        color: '#052b45',
        /*background: 'linear-gradient(to bottom, var(--app-ctr-bg-color) 0%, rgba(232, 239, 241,1) 50%)',*/
        listStyleType: "none"
    }
    onClickHandler = (event) => {
        //this.props.selectHandler(event.target.id)
        if(this.props.selectHandler){
            this.props.selectHandler(this.props.producto)
        }else{
            alert('no hay evento asociado para '+this.props.producto.nombre)
        }
    }
    render() {
        let icono =  "/logo192.png";
        let producto=this.props.producto

        if (producto.urlFoto!= null) {
            icono = AppSys.urlBase +'/'+producto.urlFoto
        }
        return (
            <Link to={"/producto/view/"+this.props.producto.id} style={StyledLink}>
            <ListGroup.Item /* onClick={this.onClickHandler}*/>
                <Row>
                    <Col  xs="3" lg="2">
                         <Image src={icono} roundedCircle style={{width:'64px',height:'64px'}}/>
                    </Col>

                    <Col xs="7" md="8" lg="8">
                        <h5>{producto.nombre}</h5>
                        <p>{producto.descripcion}</p>
                        <div style={{width:'100%'}}>
                            <span style={{  fontSize: '1.1em', marginRight:'3px' }}>Stock:{producto.stock?producto.stock:0}</span>
                            <span style={{  fontSize: '1.1em', marginRight:'3px' }}>Unidad:{producto.unidad}</span>
                            <span style={{ float: 'right', fontSize: '1.5em' }}>${producto.precio}</span>
                        </div>
                    </Col>
                 

                </Row>
            </ListGroup.Item></Link>

        );
    }
}



export default ListaProductos;  

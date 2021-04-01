
import React, { Component } from 'react';
import { ListGroup,Row,Col, Image} from "react-bootstrap";
import {Link } from 'react-router-dom';
import AppSys from '../../models/app_sys';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/16/2021, 18:22:17 ---



const StyledLink = {
    textDecoration: 'none',
    color:'var(--app-ctr-bg-color)'
};


class ListaPedidos extends Component {
    
    constructor(props) {
        super(props);
        this.state ={ pedidos:this.props.pedidos}
       
    }
    componentDidUpdate(prevProps) {
        if (prevProps.pedidos !== this.props.pedidos) {
            this.setState({pedidos:this.props.pedidos})
        }
      }

    handlerSelect=(pto)=>{
        
    }


    render() { 
        return ( <ListGroup>{
            this.state.pedidos.map((prto)=>{
               return(<ItemPedido key={prto.id} pedido={prto} selectHandler={this.handlerSelect}/>)
              
            })
           }</ListGroup> );
    }
}


class ItemPedido extends React.Component {
    
    

//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/16/2021, 18:22:17 ---


    
    styleBot = {
        borderRadius: '5px',
        border:'solid 1px var(--app-ctr-bg-color) ',
        margin: '2px 4px 2px  -35px',
        color: '#052b45',
        /*background: 'linear-gradient(to bottom, var(--app-ctr-bg-color) 0%, rgba(232, 239, 241,1) 50%)',*/
        listStyleType: "none"
    }
    onClickHandler = (event) => {
        //si está configurado el evento 
        if(this.props.selectHandler){
            this.props.selectHandler(this.props.pedido)
        }else{
            alert('no hay evento asociado para '+this.props.pedido.nombre)
        }
    }
    render() {
        let icono =  '/assets/imgs/pedido.svg';
        let obj=this.props.pedido

        if (obj.cliente.urlFoto!= null && obj.cliente.urlFoto.length>0) {
            icono = AppSys.urlBase+'/'+ obj.cliente.urlFoto
        }
        return (
            <Link to={"/pedido//list/"+this.props.pedido.id} style={StyledLink}>
            <ListGroup.Item /* onClick={this.onClickHandler}*/>
                <Row>
                    <Col  xs="3" lg="2">
                         <Image src={icono} roundedCircle style={{width:'64px',height:'64px'}}/>
                    </Col>

                    <Col  xs md="auto">
                        <h4>{obj.cliente.nombre}</h4>
                        <p>{obj.cliente.empresa}</p>
                        <span style={{ float: 'left', fontSize: '1.5em' }}>{}</span>
                        <span style={{ float: 'right', fontSize: '1.5em' }}>{<span>Monto${obj.monto}</span>}</span>
                    </Col>
                 

                </Row>
            </ListGroup.Item></Link>

        );
    }
}


export default ListaPedidos;  

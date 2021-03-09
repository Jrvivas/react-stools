
import React, { Component } from 'react';
import { ListGroup,Row,Col, Image} from "react-bootstrap";
import {Link } from 'react-router-dom';
import AppSys from '../../models/app_sys';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 02/27/2021, 20:13:33 ---



const StyledLink = {
    textDecoration: 'none',
    color:'var(--app-ctr-bg-color)'
};


class ListaCategorias extends Component {
    
    constructor(props) {
        super(props);
        this.state ={ categorias:this.props.categorias}
       
    }
    componentDidUpdate(prevProps) {
        if (prevProps.categorias !== this.props.categorias) {
            this.setState({categorias:this.props.categorias})
        }
      }

    handlerSelect=(pto)=>{
        
    }


    render() { 
        return ( <ListGroup>{
            this.state.categorias.map((prto)=>{
               return(<ItemCategoria key={prto.codigo} categoria={prto} selectHandler={this.handlerSelect}/>)
              
            })
           }</ListGroup> );
    }
}


class ItemCategoria extends React.Component {
    
    

//---CODIGO GENERADO PROR JRV-GEN FECHA: 02/27/2021, 20:13:33 ---


    
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
            this.props.selectHandler(this.props.categoria)
        }else{
            alert('no hay evento asociado para '+this.props.categoria.nombre)
        }
    }
    render() {
        let icono =  "/assets/imgs/categoria.svg";
        let obj=this.props.categoria

        if (obj.urlIcono!= null && obj.urlIcono.length>0 ) {
            icono =AppSys.urlBase+'/'+  obj.urlIcono
        }
        return (
            <Link to={"/categoria/view/"+this.props.categoria.codigo} style={StyledLink}>
            <ListGroup.Item /* onClick={this.onClickHandler}*/>
                <Row>
                    <Col  xs="3" lg="2">
                         <Image src={icono} roundedCircle style={{width:'64px',height:'64px',background: 'var(--app-ctr-bg-color)'}}/>
                    </Col>

                    <Col  xs md="auto">
                        <h4>{obj.nombre}</h4>
                        <p>{obj.descripcion}</p>
                        <span style={{ float: 'left', fontSize: '1.5em' }}>{}</span>
                        <span style={{ float: 'right', fontSize: '1.5em' }}>{}</span>
                    </Col>
                 

                </Row>
            </ListGroup.Item></Link>

        );
    }
}


export default ListaCategorias;  


import React, { Component } from 'react';
import { ListGroup,Row,Col, Image,Spinner } from "react-bootstrap";
import {GeoAlt, GeoFill,Phone, Mailbox, Shop, Telephone} from 'react-bootstrap-icons';
import {Link } from 'react-router-dom';
import AppSys from '../../models/app_sys';
import Format from '../../resources/util'



//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/07/2021, 11:25:08 ---



const StyledLink = {
    textDecoration: 'none',
    color:'var(--app-ctr-bg-color)'
};


class ListaContactos extends Component {
    
    constructor(props) {
        super(props);
        this.state ={ contactos:[]}
       
    }
    componentDidUpdate(prevProps) {
        if (prevProps.contactos !== this.props.contactos) {
            this.setState({contactos:this.props.contactos})
        }
      }

    handlerSelect=(pto)=>{
        
    }


    render() { 
        return ( <ListGroup>{
            this.state.contactos.length>0?
            this.state.contactos.map((prto)=>{
               return(<ItemContacto key={prto.id} contacto={prto} selectHandler={this.handlerSelect}/>)
              
            }):<Spinner animation="border" role="status">
            <span className="sr-only my-auto">Loading...</span>
          </Spinner>

            
           }</ListGroup> );
    }
}


class ItemContacto extends React.Component {
    
    

//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/07/2021, 11:25:08 ---


    
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
            this.props.selectHandler(this.props.contacto)
        }else{
            alert('no hay evento asociado para '+this.props.contacto.nombre)
        }
    }
    render() {
        let icono =  "/assets/imgs/contacto.svg";
        let obj=this.props.contacto
        let indCel=''
        let indEmail=''
        let indDir=''
        if (obj.urlFoto!= null && obj.urlFoto.length>0) {
            icono = AppSys.urlBase+'/'+ obj.urlFoto
        }
        if(Format.isCel(obj.cel)){
          indCel=<span style={{fontSize:'0.8em'}}><Phone  color='var(--app-ctr-bg-color)' size='18px'className='mx-2'></Phone>{obj.cel}</span>
        }
        if(Format.isDir(obj.direccion) || Format.isDir(obj.localidad)){
          indDir=<span style={{fontSize:'0.8em'}}><GeoAlt  color='var(--app-ctr-bg-color)' size='18px'className='mx-2'></GeoAlt>{obj.direccion+' '+obj.localidad}</span>
        }
        if(Format.isEmail(obj.email)){
          indEmail=<span style={{fontSize:'0.8em'}}><Mailbox  color='var(--app-ctr-bg-color)' size='18px'className='mx-2'></Mailbox>{obj.email}</span>
        }

        
        return (
            <Link to={"/contacto/view/"+this.props.contacto.id} style={StyledLink}>
            <ListGroup.Item /* onClick={this.onClickHandler}*/>
                <Row>
                    <Col  xs="3" lg="2">
                         <Image src={icono} roundedCircle style={{width:'64px',height:'64px',background: 'var(--app-ctr-bg-color)'}}/>
                    </Col>

                    <Col  xs md="auto">
                        <h4>{obj.nombre}</h4>
                        <p className='truncate'><Shop color='var(--app-ctr-bg-color)' size='18px' className='mr-2'></Shop>{obj.empresa}</p>
                        <span style={{ float: 'left', fontSize: '1.2em' }}>{indCel}</span>
                        <span style={{ float: 'left', fontSize: '1.2em' }}>{indDir}</span>
                        <span style={{ float: 'left', fontSize: '1.2em' }}>{indEmail}</span>
                        <span style={{ float: 'right', fontSize: '1.2em' }}>{}</span>
                    </Col>
                 

                </Row>
            </ListGroup.Item></Link>

        );
    }
}


export default ListaContactos;  

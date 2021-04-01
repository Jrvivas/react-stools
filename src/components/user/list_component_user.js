
import React, { Component } from 'react';
import { ListGroup,Row,Col, Image} from "react-bootstrap";
import {Link } from 'react-router-dom';
import AppSys from '../../models/app_sys';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 04/01/2021, 09:54:43 ---



const StyledLink = {
    textDecoration: 'none',
    color:'var(--app-ctr-bg-color)'
};


class ListaUsers extends Component {
    
    constructor(props) {
        super(props);
        this.state ={ users:this.props.users}
       
    }
    componentDidUpdate(prevProps) {
        if (prevProps.users !== this.props.users) {
            this.setState({users:this.props.users})
        }
      }

    handlerSelect=(pto)=>{
        
    }


    render() { 
        return ( <ListGroup>{
            this.state.users.map((prto)=>{
               return(<ItemUser key={prto.id} user={prto} selectHandler={this.handlerSelect}/>)
              
            })
           }</ListGroup> );
    }
}


class ItemUser extends React.Component {
    
    

//---CODIGO GENERADO PROR JRV-GEN FECHA: 04/01/2021, 09:54:43 ---


    
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
            this.props.selectHandler(this.props.user)
        }else{
            alert('no hay evento asociado para '+this.props.user.nombre)
        }
    }
    render() {
        let icono =  '/assets/imgs/user.svg';
        let obj=this.props.user

        if (obj.user.urlFoto!= null && obj.user.urlFoto.length>0) {
            icono = AppSys.urlBase+'/'+ obj.user.urlFoto
        }
        return (
            <Link to={"/user//list/"+this.props.user.id} style={StyledLink}>
            <ListGroup.Item /* onClick={this.onClickHandler}*/>
                <Row>
                    <Col  xs="3" lg="2">
                         <Image src={icono} roundedCircle style={{width:'64px',height:'64px'}}/>
                    </Col>

                    <Col  xs md="auto">
                        <h4>{obj.user.nombre}</h4>
                        <p>{obj.user.role}</p>
                        <span style={{ float: 'left', fontSize: '1.5em' }}>{}</span>
                        <span style={{ float: 'right', fontSize: '1.5em' }}>{<span>Activo{obj.status}</span>}</span>
                    </Col>
                 

                </Row>
            </ListGroup.Item></Link>

        );
    }
}


export default ListaUsers;  

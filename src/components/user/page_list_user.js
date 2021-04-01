
import React, { Component } from 'react';
import ListaUsers from "./list_component_user";
import BarraBusqueda from  '../barra_busqueda_component';
import User from '../../models/app_model_user';
import BotonFlotanteAdd from '../../components/boton_flotante_add'



//---CODIGO GENERADO PROR JRV-GEN FECHA: 04/01/2021, 09:54:43 ---



class PageListUser extends Component {
    constructor(props) {
        super(props);
        this.state = { users:[]}
    }
    
    componentWillMount(){
        //Obtener la lista de users
        User.getList('ALL',(rst)=>{
          this.setState({users:rst})
  
  
        })
        }
    
   

    render() { 
        return ( <div>
              <BarraBusqueda  titulo="Users" ></BarraBusqueda>
              <ListaUsers users={this.state.users}></ListaUsers>
              <BotonFlotanteAdd path="/user/new"></BotonFlotanteAdd>
        </div> );
    }
}
 
export default PageListUser;

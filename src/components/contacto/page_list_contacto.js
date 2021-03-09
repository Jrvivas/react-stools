
import React, { Component } from 'react';
import ListaContactos from "./list_component_contacto";
import BarraBusqueda from  '../barra_busqueda_component';
import BotonFlotanteAdd from '../boton_flotante_add';
import Contacto from '../../models/app_model_contacto';



//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/07/2021, 11:25:08 ---



class PageListContacto extends Component {
    constructor(props) {
        super(props);
        this.state = { contactos:[],filtrados:[],filtro:''}
    }

    componentWillMount(){
        //Obtener la lista de contactos
        Contacto.getList('ALL',(rst)=>{
          this.setState({contactos:rst,filtrados:rst,filtro:''})
         
            
  
        })
    }
    handlerFiltroChange=(event)=>{
        let txt=event.target.value
        let ftr=this.state.contactos.filter((c)=>c.nombre.toLowerCase().indexOf(txt.toLowerCase())>-1||c.cel.toLowerCase().indexOf(txt.toLowerCase())>-1 || c.empresa.toLowerCase().indexOf(txt.toLowerCase())>-1)
        this.setState({filtrados:ftr,filtro:txt})
    }

    render() { 
        return ( <div>
              <BarraBusqueda titulo="Contactos" handlertextChange={this.handlerFiltroChange}></BarraBusqueda>
              <ListaContactos contactos={this.state.filtrados}></ListaContactos>
              <BotonFlotanteAdd path="/contacto/new"></BotonFlotanteAdd>
        </div> );
    }
}
 
export default PageListContacto;

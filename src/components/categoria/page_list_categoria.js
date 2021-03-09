
import React, { Component } from 'react';
import ListaCategorias from "./list_component_categoria";
import BarraBusqueda from  '../barra_busqueda_component';
import Categoria from '../../models/app_model_categoria';
import BotonFlotanteAdd from '../../components/boton_flotante_add'



//---CODIGO GENERADO PROR JRV-GEN FECHA: 02/27/2021, 20:13:33 ---



class PageListCategoria extends Component {
    constructor(props) {
        super(props);
        this.state = { categorias:[],filtrados:[],filtro:''}
    }
    componentWillMount(){
        //Obtener la lista de productos
        Categoria.getList('ALL',(rst)=>{
          this.setState({categorias:rst,filtrados:rst,filtro:''})
  
  
        })
    }
    componentDidUpdate(prevProps) {
        /*if (prevProps.categorias !== this.props.categorias) {
            this.setState({categorias:this.props.categorias})
        }*/
      }
      handlerFiltroChange=(event)=>{
        let txt=event.target.value
        let ftr=this.state.categorias.filter((c)=>c.nombre.toLowerCase().indexOf(txt.toLowerCase())>-1||c.descripcion.toLowerCase().indexOf(txt.toLowerCase())>-1 )
        this.setState({filtrados:ftr,filtro:txt})
    }


    render() { 
        return ( <div>
               <BarraBusqueda titulo="Categoria" handlertextChange={this.handlerFiltroChange}></BarraBusqueda>
              <ListaCategorias categorias={this.state.filtrados}></ListaCategorias>
              <BotonFlotanteAdd path="/categoria/new"></BotonFlotanteAdd>
        </div> );
    }
}
 
export default PageListCategoria;

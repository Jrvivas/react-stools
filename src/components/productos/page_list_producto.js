import React, { Component } from 'react';
import ListaProductos from "./list_component";
import BarraBusqueda from  '../barra_busqueda_component';
import Producto from '../../models/app_model_producto';
import BotonFlotanteAdd from '../../components/boton_flotante_add'

class PageListProducto extends Component {
    constructor(props) {
        super(props);
        this.state = { productos:[],filtrados:[],filtro:''}
    }
    componentWillMount(){
        //Obtener la lista de productos
        Producto.getList('ALL',(rst)=>{
          this.setState({productos:rst,filtrados:rst,filtro:''})
  
  
        })
    }
    handlerFiltroChange=(event)=>{
        let txt=event.target.value
        let ftr=this.state.productos.filter((c)=>c.nombre.toLowerCase().indexOf(txt.toLowerCase())>-1||c.codigo.toLowerCase().indexOf(txt.toLowerCase())>-1 || c.descripcion.toLowerCase().indexOf(txt.toLowerCase())>-1)
        this.setState({filtrados:ftr,filtro:txt})
    }
  
    componentDidUpdate(prevProps) {
        /*if (prevProps.productos !== this.props.productos) {
            this.setState({productos:this.props.productos})
        }*/
      }

    render() { 
        return ( <div>
              <BarraBusqueda titulo="Productos" handlertextChange={this.handlerFiltroChange}></BarraBusqueda>
              <ListaProductos productos={this.state.filtrados}></ListaProductos>
              <BotonFlotanteAdd path="/producto/new"></BotonFlotanteAdd>
        </div> );
    }
}
 
export default PageListProducto;
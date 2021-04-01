
import React, { Component } from 'react';
import ListaPedidos from "./list_component_pedido";
import BarraBusqueda from  '../barra_busqueda_component';
import Pedido from '../../models/app_model_pedido';
import BotonFlotanteAdd from '../../components/boton_flotante_add'



//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/16/2021, 18:22:17 ---



class PageListPedido extends Component {
    constructor(props) {
        super(props);
        this.state = { pedidos:[]}
    }
    
    componentWillMount(){
        //Obtener la lista de pedidos
        Pedido.getList('ALL',(rst)=>{
          this.setState({pedidos:rst})
  
  
        })
        }
    
   

    render() { 
        return ( <div>
              <BarraBusqueda  titulo="Pedidos" ></BarraBusqueda>
              <ListaPedidos pedidos={this.state.pedidos}></ListaPedidos>
              <BotonFlotanteAdd path="/pedido/new"></BotonFlotanteAdd>
        </div> );
    }
}
 
export default PageListPedido;

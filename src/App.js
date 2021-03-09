import React, { Component } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import PageListProducto from './components/productos/page_list_producto'
import PageViewProducto from './components/productos/page_view_producto'
import PageEditProducto from './components/productos/page_edit_producto'

import PageListCategoria from './components/categoria/page_list_categoria'
import PageViewCategoria from './components/categoria/page_view_categoria'
import PageEditCategoria from './components/categoria/page_edit_categoria'

import PageListContacto from './components/contacto/page_list_contacto'
import PageViewContacto from './components/contacto/page_view_contacto'
import PageEditContacto from './components/contacto/page_edit_contacto'

import {Container} from 'react-bootstrap'
import Producto from './models/app_model_producto'
import './App.css';
import productos from './components/productos/productos.json'
import categorias from './components/categoria/categorias.json'
import BarraNavApp from './components/productos/barra_nav_app';

//const productos=[{"id":1,"codigo":"VNC","nombre":"Vinilo de corte","unidad":"M2","descripcion":"Vinilo de corte  hasta 2 colores con diseño existente","precio":"1550.00","costoBase":"100.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"500.00"},{"id":2,"codigo":"VNIMP","nombre":"Vinilo impreso ","unidad":"M2","descripcion":"Vinilo full color con diseño existente","precio":"1150.50","costoBase":"300.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"400.00"},{"id":3,"codigo":"677","nombre":"Estampados","unidad":"UN","descripcion":"Solo estampados sin prenda","precio":"400.00","costoBase":"100.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"50.00"},{"id":4,"codigo":"VNCFON","nombre":"Vinilo de corte con fondo","unidad":"M2","descripcion":"Fondeado con un color más gráfica no más de 2 colore","precio":"1800.00","costoBase":"300.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"800.00"},{"id":5,"codigo":"0001","nombre":"Detalles vehiculos","unidad":"UN","descripcion":"Retoques, o pegar calcos de treceros","precio":"200.00","costoBase":"150.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":6,"codigo":"LNIMPBACK","nombre":"Lona backlinght impresa","unidad":"M2","descripcion":"Lona para cartel luminoso","precio":"1500.00","costoBase":"400.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"800.00"},{"id":7,"codigo":"LNIMP","nombre":"Lona impresa frontinght","unidad":"UN","descripcion":"Lona Front impresa full color","precio":"1160.00","costoBase":"300.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"500.00"},{"id":8,"codigo":"DSS","nombre":"Diseño Gráfico","unidad":"UN","descripcion":"Gráfica  para un medio","precio":"800.00","costoBase":"100.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":9,"codigo":"VNCES","nombre":"Vinilo de corte esmerilado","unidad":"M2","descripcion":"Cortes en esmerilado combinado simple","precio":"1750.00","costoBase":"300.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"500.00"},{"id":10,"codigo":"CRTLNIMP","nombre":"Cartel de caño con lona impresa","unidad":"M2","descripcion":"Bastidor de caño 20x20 más lona impresa","precio":"3600.00","costoBase":"100.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"700.00"},{"id":11,"codigo":"","nombre":"Vinilo microperforado impreso","unidad":"M2","descripcion":"Micro perforado impreso","precio":"1500.00","costoBase":"200.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"700.00"},{"id":12,"codigo":"LIMP","nombre":"Limpieza","unidad":"M2","descripcion":"Sacar restos de gráfica anterior","precio":"350.00","costoBase":"50.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":13,"codigo":"VNCRDIS","nombre":"Vinilo Corte para diseñadores","unidad":"M2","descripcion":"Vinilo Cortado pelado y trasferido","precio":"1250.00","costoBase":"100.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":14,"codigo":"TRCORPOL","nombre":"Letras corpóreas de Polifa de 30mm terminadas","unidad":"M2","descripcion":"Corpóreas cortadas, empro lijadas y pintadas ","precio":"6800.00","costoBase":"500.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"1000.00"},{"id":15,"codigo":"VNCVIAL","nombre":"Rotulación Vial","unidad":"M2","descripcion":"Fondeado con reflectivo más gráfica","precio":"2000.00","costoBase":"300.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"300.00"},{"id":16,"codigo":"LNIMPBACOUT2FAS","nombre":"Lona blanck out impresa frente y dorso","unidad":"M2","descripcion":"","precio":"1800.00","costoBase":"300.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":17,"codigo":"LNVNCOR","nombre":"Lona front rotulada","unidad":"M2","descripcion":"Lona entelada y rotulada con gráfica hasta 2 colores","precio":"3000.00","costoBase":"300.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":18,"codigo":"VNIMPTRC","nombre":"Vinilo impreso troquelado","unidad":"M2","descripcion":"Vinilo impreso troquelado sin diseño","precio":"1500.00","costoBase":"300.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":19,"codigo":"CVENDOV","nombre":"Rotulo Vendo para autos","unidad":"UN","descripcion":"Rotulo vendo para autos","precio":"200.00","costoBase":"100.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":20,"codigo":"AI1MMFR","nombre":"Alto Impacto de 1mm forrado con vinilo","unidad":"M2","descripcion":"Alto impacto Fondeado de color o transparente","precio":"1550.00","costoBase":"200.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"800.00"},{"id":21,"codigo":"VNIMPVEHIMP","nombre":"Vinilo impreso Vehícular ORACAL","unidad":"M2","descripcion":"Vinilo impreso con fotos  para ploteo vehicular (IMPRIMA)","precio":"3200.00","costoBase":"200.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"1000.00"},{"id":22,"codigo":"VIAT","nombre":"Viaticos por Km","unidad":"UN","descripcion":"Costos de viaje más consumo","precio":"75.00","costoBase":"500.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":23,"codigo":"VARIO","nombre":"Varios","unidad":"M2","descripcion":"Trabajos de reparación o no contemplandos","precio":"500.00","costoBase":"500.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"500.00"},{"id":24,"codigo":"VINLAQ","nombre":"Vinilo  impreso Laqueado","unidad":"M2","descripcion":"","precio":"1500.00","costoBase":"300.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"600.00"},{"id":25,"codigo":"","nombre":"Vinilo MacCal metro","unidad":"UN","descripcion":"","precio":"350.00","costoBase":"0.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":26,"codigo":"HERCARTEL","nombre":"Herreria Cartel","unidad":"M2","descripcion":"Trabajos de Herreria","precio":"3000.00","costoBase":"500.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":27,"codigo":"","nombre":"Remeras estampa hasta dos color","unidad":"UN","descripcion":"Remera  Jersey Algodón con estampa hasta 2 colores","precio":"1200.00","costoBase":"500.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":28,"codigo":"PTT","nombre":"Patente Trailer ","unidad":"UN","descripcion":"Patente con AI o imantada","precio":"500.00","costoBase":"250.00","unxCaja":"1.00","cajaxPallet":"1.00","costoInstalacion":"0.00"},{"id":29,"codigo":"","nombre":"Producto prueba1","unidad":"UN","descripcion":"","precio":"1500.00","costoBase":"0.00","unxCaja":"0.00","cajaxPallet":"0.00","costoInstalacion":"0.00"}]
/**
 * Componente que maneja los productos
 * Lista los producto
 *      -Foto
 *      -Nombre
 *      -Codigo
 *      -Precio
 *      -Unidad
 *      -Stock
 *      -Valoración
 */
class AppProducto extends Component {
  constructor(props) {
    super(props);
    this.state = { productos:productos,categorias:categorias}
  }
  
  componentWillMount(){
      //Obtener la lista de productos
      Producto.getList('#',(rst)=>{
        this.setState({productos:rst})


      })
  }


  render() { 
    return ( 
    <Container>
          <BarraNavApp></BarraNavApp>
           <Router>
                  <Switch>
                    <Route exact path="/producto/">
                        <PageListProducto productos={this.state.productos}/>
                    </Route>
                    <Route path="/producto/view/:id" children={<ViewProducto/>}></Route>
                    <Route path="/producto/edit/:id" children={<EditProducto/>}></Route>
                    <Route path="/producto/new" children={<NewProducto/>}></Route>
                    <Route path="/producto/delete/:id" children={<DeleteProducto/>}></Route>

                    <Route exact path="/categoria/">
                      <PageListCategoria categorias={this.state.categorias}/>
                    </Route>
                    <Route  path="/categoria/view/:id" children={<ViewCategoria/>}></Route>
                    <Route path="/categoria/edit/:id" children={<EditCategoria/>}></Route>
                    <Route path="/categoria/new" children={<NewCategoria/>}></Route>
                    <Route path="/categoria/delete/:id" children={<DeleteCategoria/>}></Route>

                    <Route exact path="/contacto/">
                      <PageListContacto categorias={this.state.categorias}/>
                    </Route>
                    <Route  path="/contacto/view/:id" children={<ViewContacto/>}></Route>
                    <Route path="/contacto/edit/:id" children={<EditContacto/>}></Route>
                    <Route path="/contacto/new" children={<NewContacto/>}></Route>
                    <Route path="/contacto/delete/:id" children={<DeleteContacto/>}></Route>
                    
                  </Switch>
           </Router> 
        </Container>);
  }
}

function ViewProducto(){
  let { id } = useParams();
  return (
    <PageViewProducto idProducto={id}/>
  );
}
function NewProducto(){
 
  return (
    <PageEditProducto idProducto={0}/>
  );
}

function EditProducto(){
  let { id } = useParams();
  return (
    <PageEditProducto idProducto={id}/>
  );
}


function DeleteProducto(){
  let { id } = useParams();
  return (
   <div>DELETE</div>
  );
}

//------------------------
function ViewContacto(){
  let { id } = useParams();
  return (
    <PageViewContacto idContacto={id}/>
  );
}
function NewContacto(){
 
  return (
    <PageEditContacto idContacto={0}/>
  );
}

function EditContacto(){
  let { id } = useParams();
  return (
    <PageEditContacto idContacto={id}/>
  );
}


function DeleteContacto(){
  let { id } = useParams();
  return (
   <div>DELETE</div>
  );
}
//---------------------

function ViewCategoria(){
  let { id } = useParams();

  return (
    <PageViewCategoria idCategoria={id}/>
  );
}

function EditCategoria(){
  let { id } = useParams();
  return (
    <PageEditCategoria idCategoria={id}/>
  );
}
function NewCategoria(){
 
  return (
    <PageEditCategoria idCategoria={''}/>
  );
}



function DeleteCategoria(){
  let { id } = useParams();
  return (
   <div>DELETE</div>
  );
}
 
 
/*<Router>
                  <Switch>
                    <Route exact path="/">
                        <PageListProducto productos={this.state.productos}/>
                    </Route>
                    <Route path="/view">
                        <PageViewProducto/>
                    </Route>
                    <Route path="/edit">
                        <PageEditProducto/>
                    </Route>
                  </Switch>
        </Router>  */    
export default AppProducto;

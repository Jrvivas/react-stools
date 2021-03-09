import Server from '../resources/app_server';
import AppSys from '../models/app_sys';
import productos from '../components/productos/productos.json' //para texting
const appSys={idApp: "216b68d3638b76c2-20200527081443", urlBase: "http://localhost/web", token: "G86S2nO_9U3n_sqHhNEuq0g8N-zdG3iZLsHkotH4BmBXhsaxGfKwH6a0rc_WgHzkH0RUg5FeAt1YtNHVobAzVg==", user: {id: 3, nombre: "MonicaV", perfil_code: "EJE"}}

/*
*@require util
*@require app_server
*/

/**
 * Clase responsable de manejo de los productos
 */
export default class Producto{
    static UNIDAD_PRECIO_UNIDAD='UN'
    static UNIDAD_PRECIO_CAJA='CJ'
    static UNIDAD_PRECIO_PALLET='PL'
    static UNIDAD_PRECIO_M2='M2'
    static UNIDAD_PRECIO_MLINEAL='ML'

    static ESTADO_ACTIVO='ACTIVO'
    static ESTADO_BORRADO='BORRADO'
    static ESTADO_SUSPENSO='SUSPENSO'

    /**
     * 
     * @param {string} idApp Id de la Aplicacion
     * @param {int} id 
     * @param {int} idCliente ide del cliente si existe
     * @param {obj} done funcion callback
     */
    static find(id,idCliente=null,done){
        let idApp=appSys.idApp
        if( !isNaN(id) ){
            let prtos=productos;

           (new Server()).get(AppSys.urlBase+'/productos?app_idApp='+idApp+"&id="+id,{'_csrf': AppSys.sesion.token},function(rst){
                if(rst){
                    let producto=rst;//rst.data;
                        //console.log("Datas :",producto);
                        let objProducto=new Producto();
                        objProducto.fromJson(producto)
                        if(done){
                            done(objProducto);
                        };
    
                }else{
                    console.log('ERROR: Producto.find','Se produjo un error de servidor '+rst.message)  
                }
            });
        }
    }
    /**
     * Devuelve la lista de productos disponible
     * @param {string} idApp 
     * @param {fun} done 
     */
    static getList(tipo='ALL',done){
        if(tipo=='ALL'){
            //(new Server()).consulta('http://127.0.0.1:4000/products',{},function(rst){
            (new Server()).get(AppSys.urlBase+'/productos?app_idApp='+AppSys.sesion.idApp+"&id=0",{'_csrf': AppSys.sesion.token},function(rst){   
                    let productos=rst
                    if(done){
                        done(productos)
                    }
               
            })
        }
    }
    


    

   constructor( id=0,
                app_idApp='',
                codigo='',
                nombre='',
                descripcion='',
                urlFoto='',
                estado=Producto.ESTADO_ACTIVO,
                precio=0,
                costo=0,
                tiempo=0,   //tiempo de elavoracion del producto
                unidad=Producto.UNIDAD_PRECIO_UNIDAD,
                unxCaja=0,
                cajaxPallet=0,
                idTipoProducto=0,
                categoriaCodigo=''){
    this.id=id
    this.app_idApp=app_idApp
    this.codigo=codigo
    this.nombre=nombre
    this.descripcion=descripcion
    this.urlFoto=urlFoto
    this.estado=estado
    this.precio=precio
    this.costo=costo
    this.unidad=unidad
    this.unxCaja=unxCaja
    this.cajaxPallet=cajaxPallet
    this.idTipoProducto=idTipoProducto
    this.categoriaCodigo=categoriaCodigo
    this.costoBase=0
    this.costoInstalacion=0
    this.opciones=''// usar
    this.idLista=0 //?
    this.stock=0
    this.tiempo=tiempo

}

    /**metodo standar  que carga un objeto desde un json*/
    fromJson(dataJson){

        if(dataJson){
            let key;
            for(key in dataJson){
                if(dataJson.hasOwnProperty(key)){
                    this[key] =dataJson[key];
                  }
                console.log(key)
            }
            
        }else{
            console.log('ERROR: Producto.fromJson','la variable pasada es null')
        }
    }

    save(done){
      
            
            (new Server()).update(AppSys.urlBase+'/productos',this,function(rst){    
            
            if(rst){
               //alert('Operación terminada')
               if(done){
                   done()
               }
            }
       
         })
    }

}


import Server from '../resources/app_server';
import AppSys from '../models/app_sys';

export default class Precio{

        /**
     * 
     * @param {string} idApp Id de la Aplicacion
     * @param {int} id 
     * @param {int} idCliente ide del cliente si existe
     * @param {obj} done funcion callback
     */
         static find(idProducto,idCliente=null,done){
            let idApp=AppSys.sesion.idApp
            if( !isNaN(idCliente) && !isNaN(idProducto)  ){
              //  let prtos=Contacto;
    
               (new Server()).get(AppSys.urlBase+'/precios?app_idApp='+idApp+"&idProducto="+idProducto+"&idCliente="+idCliente,{'_csrf': AppSys.sesion.token},function(rst){
                    if(rst){
                        let precio=rst;//rst.data;
                            
                            let objPrecio=new Precio();
                            objPrecio.fromJson(precio)
                            if(done){
                                done(objPrecio);
                            };
        
                    }else{
                        console.log('ERROR: Precio.find','Se produjo un error de servidor ')  
                    }
                });
            }
        }
        /**
         * Devuelve la lista de contactos disponible
         * @param {string} idApp 
         * @param {fun} done 
         */
        static getList(idCliente,tipo='ALL',done){
            if(tipo=='ALL'){
             
                (new Server()).get(AppSys.urlBase+'/precios?app_idApp='+AppSys.sesion.idApp+"&idCliente="+idCliente,{'_csrf': AppSys.sesion.token},function(rst){   
                        let precio=rst
                        if(done){
                            done(precio)
                        }
                   
                })
            }
        }
        
}
import categoria from '../components/categoria/categorias.json' //para texting
import Server from '../resources/app_server';
import AppSys from '../models/app_sys';


export default class Categoria{
    static find(codigo,idCliente=null,done){
        let idApp=AppSys.sesion.idApp
        if( codigo!=""){

            (new Server()).get(AppSys.urlBase+'/categorias?app_idApp='+idApp+"&codigo="+codigo,{'_csrf': AppSys.sesion.token},function(rst){
                if(rst){
                    let categoria=rst;//rst.data;
                        //console.log("Datas :",producto);
                        let objCategoria=new Categoria();
                        objCategoria.fromJson(categoria)
                        if(done){
                            done(objCategoria);
                        };
    
                }else{
                    console.log('ERROR: Categoria.find','Se produjo un error de servidor '+rst)  
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
            
            (new Server()).get(AppSys.urlBase+'/categorias?app_idApp='+AppSys.sesion.idApp+"&codigo=#",{'_csrf': AppSys.sesion.token},function(rst){   
                    let categorias=rst
                    if(done){
                        done(categorias)
                    }
               
            })
        }
    }
    constructor(codigo='#',urlFoto='',nombre='',descripcion=''){
        this.codigo=codigo
        this.urlFoto=urlFoto
        this.nombre=nombre
        this.descripcion=descripcion
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
            console.log('ERROR: Categoriao.fromJson','la variable pasada es null')
        }
    }
    save(done){
      
            
        (new Server()).update(AppSys.urlBase+'/categorias',this,function(rst){    
        
        if(rst){
           //alert('Operación terminada')
           if(done){
               done()
           }
        }
   
     })
}


}
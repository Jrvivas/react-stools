import Server from '../resources/app_server';
import AppSys from '../models/app_sys';


/*
*@require util
*@require app_server
*/

/**
 * Clase responsable de manejo de los contactos
 */
export default class Contacto{
    
    /**
     * 
     * @param {string} idApp Id de la Aplicacion
     * @param {int} id 
     * @param {int} idCliente ide del cliente si existe
     * @param {obj} done funcion callback
     */
    static find(id,idCliente=null,done){
        let idApp=AppSys.sesion.idApp
        if( !isNaN(id) ){
          //  let prtos=Contacto;

           (new Server()).get(AppSys.urlBase+'/contactos?app_idApp='+idApp+"&id="+id,{'_csrf': AppSys.sesion.token},function(rst){
                if(rst){
                    let contacto=rst;//rst.data;
                        //console.log("Datas :",contacto);
                        let objContacto=new Contacto();
                        objContacto.fromJson(contacto)
                        if(done){
                            done(objContacto);
                        };
    
                }else{
                    console.log('ERROR: Contacto.find','Se produjo un error de servidor '+rst.message)  
                }
            });
        }
    }
    /**
     * Devuelve la lista de contactos disponible
     * @param {string} idApp 
     * @param {fun} done 
     */
    static getList(tipo='ALL',done){
        if(tipo=='ALL'){
         
            (new Server()).get(AppSys.urlBase+'/contactos?app_idApp='+AppSys.sesion.idApp+"&id=0",{'_csrf': AppSys.sesion.token},function(rst){   
                    let contactos=rst
                    if(done){
                        done(contactos)
                    }
               
            })
        }
    }
    


    

   constructor(id,nombre){
    this.id=id
    this.app_idApp='#'
    this.codigo=''
    this.nombre=nombre
    this.errors=[]
    

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
            console.log('ERROR: contacto.fromJson','la variable pasada es null')
        }
    }

    save(done){
      
            
            (new Server()).update(AppSys.urlBase+'/contactos',this,function(rst){    
            
            if(rst){
               //alert('Operación terminada')
               if(done){
                   done()
               }
            }
       
         })
    }
    validate(){
        let validate=1
        this.errors=[]
        if(this.nombre.length<=0){
            validate&=0
            this.errors.push({name:'nombre',text:'El nombre está vacio'})
        }
        if(this.direccion.length<=0){
            validate&=0
            this.errors.push({name:'direccion',text:'La dirección está vacia'})
        }
        if(this.localidad.length<=0){
            validate&=0
            this.errors.push({name:'localidad',text:'La localidad está vacia'})
        }
        if(this.empresa.length<=0){
            validate&=0
            this.errors.push({name:'empresa',text:'El empresa está vacio'})
        }
        if(this.cuit.length<=0){
            validate&=0
            this.errors.push({name:'cuit',text:'El C.U.I.T está vacio'})
        }
        if(this.cel.length<=0){
            validate&=0
            this.errors.push({name:'cel',text:'El Telefono Movil está vacio'})
        }
        if(this.tel.length<=0){
            validate&=0
            this.errors.push({name:'cel',text:'El Telefono fijo está vacio'})
        }
        if(this.email.length<=0){
            validate&=0
            this.errors.push({name:'cel',text:'El Email está vacio'})
        }
        return validate
    }

}


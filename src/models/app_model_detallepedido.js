
import Server from '../resources/app_server';
import AppSys from '../models/app_sys';




//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/25/2021, 15:04:57 ---



/**
 * Clase responsable de manejo de los detallepedidos
 */
export default class Detallepedido{


    static find(id,done){
        let idApp=AppSys.sesion.idApp
        if( id>0  ){
           // let objs=detallepedidos;

           (new Server()).get(AppSys.urlBase+'/detallepedidos?app_idApp='+idApp+"&id="+id,{'_csrf': AppSys.sesion.token},function(rst){
                if(rst){
                    let detallepedido=rst;//rst.data;
                        //console.log("Datas :",detallepedido);
                        let objDetallepedido=new Detallepedido();
                        objDetallepedido.fromJson(detallepedido)
                        if(done){
                            done(objDetallepedido);
                        };
    
                }else{
                    console.log('ERROR: Detallepedido.find','Se produjo un error de servidor ')  
                }
            });
        }
    }
    /**
     * Devuelve la lista de detallepedidos disponible
     * @param {string} idApp 
     * @param {fun} done 
     */
    static getList(tipo='ALL',done){
        if(tipo=='ALL'){
           
            (new Server()).get(AppSys.urlBase+'/detallepedidos?app_idApp='+AppSys.sesion.idApp,{'_csrf': AppSys.sesion.token},function(rst){   
                    let detallepedidos=rst
                    if(done){
                        done(detallepedidos)
                    }
               
            })
        }

    }
    
    
     constructor( id=0,producto="" ,cantidad="1" ,fraccion="1" ,comentario="" ,monto="0.00" ,costo="0.00" ){
      
		this.id=id; 
        this.producto=producto;
		 this.cantidad=cantidad;
		 this.fraccion=fraccion;
		 this.comentario=comentario;
		 this.monto=monto;
		 this.costo=costo
        this.errors=[]
     }
    
    refresh(){
        if(this.producto){
            this.monto=parseFloat(this.cantidad)*this.evalFormula(this.fraccion)*parseFloat(this.producto.precio)
            this.costo=parseFloat(this.cantidad)*this.evalFormula(this.fraccion)*parseFloat(this.producto.costo)
        }
    }

    evalFormula(txtFormula){
        let txt=txtFormula.toLowerCase().replaceAll('x','*')
        txt=txt.replaceAll(',','.')
        return this.evalMath(txt)
    }
    evalMath(str) {
       try { 
        return Function(`'use strict'; return (${str})`)()
        } catch (e) {
        if (e.name !== 'SyntaxError') throw e
        return NaN;
      }
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
            console.log('ERROR: Detallepedido.fromJson','la variable pasada es null')
        }
    }
    /** Metodo para catualizar el modelo*/
    save(done){
      
            
            (new Server()).update(AppSys.urlBase+'/detallepedidos',this,function(rst){    
            
            if(rst){
                if(done){
                   done()
               }
            }
       
         })
    }
    
    //** Metodo de validaci�n del modelo*/
    validate(){
        let validate=1
        this.errors=[]
        
        /*if(this.nombre.length<=0){
            validate&=0
            this.errors.push({name:'nombre',text:'El nombre est� vacio'})
        }*/
        
        
	 if(this.id.length<=0){
		 validate&=0
		 this.errors.push({name:'Id',text:'Id est� vacio'})
	}


	 if(this.producto.length<=0){
		 validate&=0
		 this.errors.push({name:'Producto',text:'Producto est� vacio'})
	}


	 if(this.cantidad.length<=0){
		 validate&=0
		 this.errors.push({name:'Cantidad',text:'Cantidad est� vacio'})
	}

        
        return validate
    } 
    
}

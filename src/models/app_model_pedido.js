
import Server from '../resources/app_server';
import AppSys from '../models/app_sys';
import Detallepedido from './app_model_detallepedido';
import Format from '../resources/util'



//---CODIGO GENERADO PROR JRV-GEN FECHA: 03/15/2021, 19:21:08 ---



/**
 * Clase responsable de manejo de los pedidos
 */
export default class Pedido{


    static find(id,done){
        let idApp=AppSys.sesion.idApp
        if( id>0  ){
            //let objs=pedidos;

           (new Server()).get(AppSys.urlBase+'/pedidos?app_idApp='+idApp+"&id="+id,{'_csrf': AppSys.sesion.token},function(rst){
                if(rst){
                    let pedido=rst;//rst.data;
                        //console.log("Datas :",pedido);
                        let objPedido=new Pedido();
                        objPedido.fromJson(pedido)
                        if(done){
                            done(objPedido);
                        };
    
                }else{
                    console.log('ERROR: Pedido.find','Se produjo un error de servidor ')  
                }
            });
        }
    }
    /**
     * Devuelve la lista de pedidos disponible
     * @param {string} idApp 
     * @param {fun} done 
     */
    static getList(tipo='ALL',done){
        if(tipo=='ALL'){
           
            (new Server()).get(AppSys.urlBase+'/pedidos?app_idApp='+AppSys.sesion.idApp,{'_csrf': AppSys.sesion.token},function(rst){   
                    let pedidos=rst
                    if(done){
                        done(pedidos)
                    }
               
            })
        }

    }
    
    
     constructor(foto="" ,cliete="" ,responsable="" ,modifico="" ,fechaIni=Format.nowDate() ,fechaEntrega=Format.nowDate() ,Delivery="" ,monto="" ,pago="" ,saldo="" ,descuento="" ,impuesto="" ,estado="" ,prioridad=""  ){
        		 this.foto=foto;
		 this.cliete=cliete;
		 this.responsable=responsable;
		 this.modifico=modifico;
		 this.fechaIni=fechaIni;
		 this.fechaEntrega=fechaEntrega;
		 this.Delivery=Delivery;
		 this.monto=monto;
		 this.pago=pago;
		 this.saldo=saldo;
		 this.descuento=descuento;
		 this.impuesto=impuesto;
		 this.estado=estado;
		 this.prioridad=prioridad;
		 this.detalles=[]
     }

     addDetalle(det){
         if(det && det instanceof Detallepedido && det.validate()==1){
             this.detalles.push(det)
         }
         else{
             alert ('El detalle no es valida para agregarlo')
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
            console.log('ERROR: Pedido.fromJson','la variable pasada es null')
        }
    }

    save(done){
      
            
            (new Server()).update(AppSys.urlBase+'/pedidos',this,function(rst){    
            
            if(rst){
                if(done){
                   done()
               }
            }
       
         })
    }
      //** Metodo de validación del modelo
      validate(){
        let validate=1
        this.errors=[]

        /*if(this.nombre.length<=0){
            validate&=0
            this.errors.push({name:'nombre',text:'El nombre está vacio'})
        }*/


         if(this.id.length<=0){
                 validate&=0
                 this.errors.push({name:'Id',text:'Id está vacio'})
        }


         if(this.contacto_id.length<=0){
                 validate&=0
                 this.errors.push({name:'Cliente',text:'Cliente está vacio'})
        }


         if(this.idResponsable.length<=0){
                 validate&=0
                 this.errors.push({name:'Responsable',text:'Responsable está vacio'})
        }



         if(this.fechaIni.length<=0){
                 validate&=0
                 this.errors.push({name:'Fecha',text:'Fecha está vacio'})
        }


         if(this.fechaEntrega.length<=0){
                 validate&=0
                 this.errors.push({name:'Fecha Entrega',text:'Fecha Entrega está vacio'})
        }









         if(this.estado.length<=0){
                 validate&=0
                 this.errors.push({name:'Estado',text:'Estado está vacio'})
        }


         if(this.prioridad.length<=0){
                 validate&=0
                 this.errors.push({name:'Prioridad',text:'Prioridad está vacio'})
        }




        return validate

}
    
}

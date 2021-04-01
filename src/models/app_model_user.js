
import Server from '../resources/app_server';
import AppSys from '../models/app_sys';




//---CODIGO GENERADO PROR JRV-GEN FECHA: 04/01/2021, 08:58:52 ---



/**
 * Clase responsable de manejo de los users
 */
export default class User{


    static find(id,done){
        let idApp=AppSys.sesion.idApp
        if( id>0  ){
           // let objs=users;

           (new Server()).get(AppSys.urlBase+'/users?app_idApp='+idApp+"&id="+id,{'_csrf': AppSys.sesion.token},function(rst){
                if(rst){
                    let user=rst;//rst.data;
                        //console.log("Datas :",user);
                        let objUser=new User();
                        objUser.fromJson(user)
                        if(done){
                            done(objUser);
                        };
    
                }else{
                    console.log('ERROR: User.find','Se produjo un error de servidor ')  
                }
            });
        }
    }
    /**
     * Devuelve la lista de users disponible
     * @param {string} idApp 
     * @param {fun} done 
     */
    static getList(tipo='ALL',done){
        if(tipo=='ALL'){
           
            (new Server()).get(AppSys.urlBase+'/users?app_idApp='+AppSys.sesion.idApp,{'_csrf': AppSys.sesion.token},function(rst){   
                    let users=rst
                    if(done){
                        done(users)
                    }
               
            })
        }

    }
    
    
     constructor(foto="" ,nombre="" ,password="" ,email="" ,userMovil="" ,authkey="" ,accesstoken="" ,status="" ,fechaaccess="" ){
        		 this.foto=foto;
		 this.nombre=nombre;
		 this.password=password;
		 this.email=email;
		 this.userMovil=userMovil;
		 this.authkey=authkey;
		 this.accesstoken=accesstoken;
		 this.status=status;
		 this.fechaaccess=fechaaccess
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
            console.log('ERROR: User.fromJson','la variable pasada es null')
        }
    }
    /** Metodo para catualizar el modelo*/
    save(done){
      
            
            (new Server()).update(AppSys.urlBase+'/users',this,function(rst){    
            
            if(rst){
                if(done){
                   done()
               }
            }
       
         })
    }
    
    /** Metodo de validación del modelo*/
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


	 if(this.nombre.length<=0){
		 validate&=0
		 this.errors.push({name:'Nombre completo',text:'Nombre completo está vacio'})
	}


	 if(this.password.length<=0){
		 validate&=0
		 this.errors.push({name:'Clave',text:'Clave está vacio'})
	}


	 if(this.email.length<=0){
		 validate&=0
		 this.errors.push({name:'Email',text:'Email está vacio'})
	}


	 if(this.userMovil.length<=0){
		 validate&=0
		 this.errors.push({name:'Celular',text:'Celular está vacio'})
	}


	 if(this.authkey.length<=0){
		 validate&=0
		 this.errors.push({name:'Authkey',text:'Authkey está vacio'})
	}


	 if(this.accesstoken.length<=0){
		 validate&=0
		 this.errors.push({name:'Accesstoken',text:'Accesstoken está vacio'})
	}


	 if(this.status.length<=0){
		 validate&=0
		 this.errors.push({name:'Estado',text:'Estado está vacio'})
	}


	 if(this.fechaaccess.length<=0){
		 validate&=0
		 this.errors.push({name:'Fechaaccess',text:'Fechaaccess está vacio'})
	}


        
        return validate
    }
    
}

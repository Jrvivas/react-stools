import React, {useState,useEffect} from 'react';
import {Form, Button,ButtonGroup, Image, Spinner,Card} from 'react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import ImageFile from '../../resources/file_manager';
import AppSys from '../../models/app_sys';
import User from '../../models/app_model_user';


//---CODIGO GENERADO PROR JRV-GEN FECHA: 04/01/2021, 09:54:43 ---


        /**
        *Pagina que edita lo valores de User seleccionado
        *@param obj props propiedades pasadas (props.idUser)
        */
        const PageEditUser=(props)=>{
            const [datos, setDatos] = useState({
                foto:'',id:'',nombre:'',password:'',email:'',userMovil:'',role:'',authkey:'',accesstoken:'',status:'',fechaaccess:''
            })
            
            const [estado, setEstado] = useState('NORMAL');
            
            //--- estado generados
            
            
            const history = useHistory();
            
            useEffect(() => {
                 //componentDidMount
                 User.find(props.idUser, null, (rta) => {
                       setDatos(rta)
                     })
                     
                return () => {
                 //componentWillUnmount

                };
            }, []);
            
            //--Metodos generados
            

            const handleInputChange = (event) => {
                    if (event.target.files) {
                        mostrarImagen(event)
                    }

                setDatos({
                    ...datos,
                    [event.target.name] : event.target.value
                })
            }

            const enviarDatos = (event) => {
                event.preventDefault()
                console.log('enviando datos...' + datos.foto+ ' '+datos.id+ ' '+datos.nombre+ ' '+datos.password+ ' '+datos.email+ ' '+datos.userMovil+ ' '+datos.role+ ' '+datos.authkey+ ' '+datos.accesstoken+ ' '+datos.status+ ' '+datos.fechaaccess+ ' ')
                
                if(estado==='NORMAL'){
                    let obj=new User()
                    obj.fromJson(datos)
                    
                    
                   
                    if (obj.validate() == 1) {

                        obj.save(() => {
                            setEstado('TERMINADO')
                            history.push("/user/");
                        })
                    } else {
                        alert("errores:" + obj.errors.map((e) => e.text))
                        setEstado('NORMAL')
                        return
                    }
                }

                setEstado('ENVIADO')
            }
            
            
            //const pto = props.producto;
            
            let img='/assets/imgs/user.svg'//'
            if(datos.urlFoto && datos.urlFoto.length>0){
              img=AppSys.urlBase+'/'+ datos.urlFoto
            }
            return (
                <Form onSubmit={enviarDatos}>
                 <Card style={{ maxWidth: '600px', marginRight:'auto',marginLeft:'auto' }}>
                    <Card.Img  id="preview" variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)',maxWidth:'250px',marginLeft:'auto',marginRight:'auto' }} />
                		<Form.Group >
			<Form.File id="formGroupFoto" name="foto" label="Foto" onChange={handleInputChange} defaultValue={datos.foto!=''?datos.foto:''} />
		</Form.Group>
		<Form.Group controlId={"formGroupNombre"} >
			<Form.Label> Nombre completo</Form.Label >
			<Form.Control type="text"  name="nombre"  placeholder="Nombre completo" onChange={handleInputChange}  defaultValue={datos.nombre!=''?datos.nombre:''}/>
		</Form.Group>
		<Form.Group controlId={"formGroupPassword"} >
			<Form.Label> Clave</Form.Label >
			<Form.Control type="text"  name="password"  placeholder="Clave" onChange={handleInputChange}  defaultValue={datos.password!=''?datos.password:''}/>
		</Form.Group>
		<Form.Group controlId={"formGroupEmail"} >
			<Form.Label> Email</Form.Label >
			<Form.Control type="text"  name="email"  placeholder="Email" onChange={handleInputChange}  defaultValue={datos.email!=''?datos.email:''}/>
		</Form.Group>
		<Form.Group controlId={"formGroupUsermovil"} >
			<Form.Label> Celular</Form.Label >
			<Form.Control type="text"  name="userMovil"  placeholder="Celular" onChange={handleInputChange}  defaultValue={datos.userMovil!=''?datos.userMovil:''}/>
		</Form.Group>
		<Form.Group controlId={"formGroupRole"} >
			<Form.Label> Perfil</Form.Label >
			<Form.Control as="select"  name="role"  onChange={handleInputChange} defaultValue={datos.role!=''?datos.role:''} >
				<option value="10">Operador</option>
				<option value="15">Responsable</option>
				<option value="20">Gerente</option>
				<option value="30">Administrador</option>
			</Form.Control>
		</Form.Group>
		<Form.Group controlId={"formGroupStatus"} >
			<Form.Label> Estado</Form.Label >
			<Form.Control as="select"  name="status"  onChange={handleInputChange} defaultValue={datos.status!=''?datos.status:''} >
				<option value="0">Borrado</option>
				<option value="10">ACTIVO</option>
			</Form.Control>
		</Form.Group>
		<Form.Group controlId={"formGroupFechaaccess"} >
			<Form.Label> Fechaaccess</Form.Label >
			<Form.Control type="date"  name="fechaaccess"  placeholder="Fechaaccess" onChange={handleInputChange}  defaultValue={datos.fechaaccess!=''?datos.fechaaccess:''}/>
		</Form.Group>

                    <ButtonGroup size="lg" className="mb-2">
                        <Link to='/user/' className='btn btn-primary'>Cancelar </Link> 
                        <Button type="submit" className='btn btn-success'><Spinner animation="border" style={{display:estado==='NORMAL'?'none':'inline-block'}}/>Aceptar</Button>
                    </ButtonGroup>
                    
                    
                    
                    </Card>
                </Form>

            );
        }
         function mostrarImagen(event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
              var img = document.getElementById('preview');
              img.src= event.target.result;
            }
            reader.readAsDataURL(file);
          }
 
        export default PageEditUser;
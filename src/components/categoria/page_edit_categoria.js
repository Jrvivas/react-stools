import React, {useState,useEffect} from 'react';
import {Form, Button,ButtonGroup, Image, Spinner,Card} from 'react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import Categoria from '../../models/app_model_categoria';
import AppSys from '../../models/app_sys';
import ImageFile from '../../resources/file_manager';


//---CODIGO GENERADO PROR JRV-GEN FECHA: 02/27/2021, 20:13:33 ---


        /**
        *Pagina que edita lo valores de Categoria seleccionado
        *@param obj props propiedades pasadas (props.idCategoria)
        */
        const PageEditCategoria=(props)=>{
            const [datos, setDatos] = useState({
                urlFoto:'',codigo:'',nombre:'',descripcion:''
            })
            
            const [estado, setEstado] = useState('NORMAL');
            
            const history = useHistory();
            
            useEffect(() => {
                 //componentDidMount
                 Categoria.find(props.idCategoria, null, (rta) => {
                       setDatos(rta)
                     })
                     
                return () => {
                 //componentWillUnmount

                };
            }, []);

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
                console.log('enviando datos...' + datos.urlIcono+ ' '+datos.codigo+ ' '+datos.nombre+ ' '+datos.descripcion+ ' ')
                
                if(estado==='NORMAL'){
                    let obj=new Categoria()
                    obj.fromJson(datos)
                    obj.app_idApp=AppSys.sesion.idApp
                    
                    //guardar imagen si hay
                    let fileFoto=document.querySelector("#formGroupUrlfoto").files[0]
                    if(fileFoto){
                        ImageFile.downloadImg(fileFoto,'CATEG_'+obj.codigo,(url)=>{
                            if(url.url){
                                obj.urlIcono=url.url
                            }else{
                                alert(url)
                                obj.urlIcono=''
                            }
                                
                            obj.save(()=>{
                                        setEstado('TERMINADO')
                                        history.push("/categoria/");
                            })
                         })

                     }else{
                        obj.save(()=>{
                                setEstado('TERMINADO')
                                history.push("/categoria/");
                            })
                       }
                }
                setEstado('ENVIADO')
            
        }
            
            
            //const pto = props.producto;
            
            let img='/assets/imgs/categoria.svg'//'
            if(datos.urlIcono){
              img=AppSys.urlBase+'/'+ datos.urlIcono
            }
            return (
                <Form onSubmit={enviarDatos}>
                 <Card style={{ maxWidth: '600px', marginRight:'auto',marginLeft:'auto' }}>
                    <Card.Img  id="preview" variant="top" src={img + "?text=Image cap"} style={{ background: ' var(--app-ctr-bg-color)',maxWidth:'250px',marginLeft:'auto',marginRight:'auto' }} />
                		<Form.Group >
			<Form.File id="formGroupUrlfoto" name="urlFoto" label="Foto" onChange={handleInputChange} defaultValue={datos.urlIcono!=''?datos.urlIcono:''} />
		</Form.Group>
		<Form.Group controlId={"formGroupCodigo"} >
			<Form.Label> Codigo</Form.Label >
			<Form.Control type="text"  name="codigo"  placeholder="Codigo" onChange={handleInputChange}  defaultValue={datos.codigo!=''?datos.codigo:''}/>
		</Form.Group>
		<Form.Group controlId={"formGroupNombre"} >
			<Form.Label> Nombre</Form.Label >
			<Form.Control type="text"  name="nombre"  placeholder="Nombre" onChange={handleInputChange}  defaultValue={datos.nombre!=''?datos.nombre:''}/>
		</Form.Group>
		<Form.Group controlId={"formGroupDescripcion"} >
			<Form.Label> Descripcion</Form.Label >
			<Form.Control type="text"  name="descripcion"  placeholder="Descripcion" onChange={handleInputChange}  defaultValue={datos.descripcion!=''?datos.descripcion:''}/>
		</Form.Group>

                    <ButtonGroup size="lg" className="mb-2">
                        <Link to='/categoria/' className='btn btn-primary'>Cancelar </Link> 
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
 
        export default PageEditCategoria;
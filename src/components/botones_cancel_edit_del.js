import React, {useState,useEffect} from 'react';
import {ButtonGroup} from 'react-bootstrap';
import { Link,useHistory } from 'react-router-dom';

export default function BotonesCancelEditDel(props){
    return( 
    <ButtonGroup size="lg" className="mb-2">
        <Link to={'/'+props.entidad+'/'} className='btn btn-primary'  style={{fontSize:'1em'}}>Cancelar </Link>
        <Link to={'/'+props.entidad+'/edit/' + props.id} className='btn btn-success'  style={{fontSize:'1em'}}>Modificar</Link>
        <Link to={'/'+props.entidad+'/delete/' + props.id} className='btn btn-danger'  style={{fontSize:'1em'}}>Borrar </Link>
    </ButtonGroup>
  )
}
import React, { useState } from 'react';
import {Plus} from 'react-bootstrap-icons';
import { propTypes } from 'react-bootstrap/esm/Image';
import {Link} from 'react-router-dom';
function BotonFlotanteAdd(props){
    
    return(
        <div className="bg-bot-float">
         
             <Link to={props.path}><Plus className="txt-bot-float" size="78px" ></Plus></Link> 
     
        </div>
    )
}
export default BotonFlotanteAdd;
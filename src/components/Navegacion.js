import React from 'react';
import {Link} from 'react-router-dom';
import './Navegacion.css'

const Navegacion = () => {
    return(
        <nav className="col-12 col-md-8">
            <Link to={'/'}> Todos los posts</Link>
            <Link to={'/crear'}> Crear post</Link>
        </nav>
    );
}
export default Navegacion;

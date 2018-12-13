import React, { Component } from 'react';

class Formulario extends Component{
    
    tituloRef = React.createRef();
    contenidoRef = React.createRef();

    crearPost = (e) => {
        e.preventDefault();

        //leer ref
        const post = {
            title: this.tituloRef.current.value,
            body: this.contenidoRef.current.value,
            userId: 1
        }        

        //enviar contenido
        this.props.crearPost(post);
    }
    
    render(){
        return(
            <form onSubmit={this.crearPost} className="col-8">
                <legend className="text-center">Crear post</legend>
                <div className="form-group">
                    <label>Titulo del Post</label>
                    <input ref={this.tituloRef} type="text" className="form-control" placeholder="titulo Post"/>
                </div>
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea  ref={this.contenidoRef} className="form-control" placeholder="Contenido Post">
                    </textarea>
                </div>
                <button type="submit" className="btn btn-primary"> Crear </button>
            </form>
        )
    }
}

export default Formulario;
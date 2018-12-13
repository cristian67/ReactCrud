import React, { Component } from 'react';

class EditarPost extends Component{
    
    tituloRef = React.createRef();
    contenidoRef = React.createRef();

    updatePost = (e) => {
        e.preventDefault();

        //leer ref
        const post = {
            title: this.tituloRef.current.value,
            body: this.contenidoRef.current.value,
            userId: 1,
            id: this.props.post.id
        }        

        //console.log(post);
        
        //enviar contenido
        this.props.editarPost(post);
    }

    cargarFormulario = () => {

        if(!this.props.post) {return null};

        const {title, body} = this.props.post;


        return(
            <form onSubmit={this.updatePost} className="col-8">
                <legend className="text-center">Editar post</legend>
                <div className="form-group">
                    <label>Titulo del Post</label>
                    <input ref={this.tituloRef} type="text" className="form-control" defaultValue={title}/>
                </div>
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea  ref={this.contenidoRef} className="form-control" defaultValue ={body}>
                    </textarea>
                </div>
                <button type="submit" className="btn btn-primary"> Guardar </button>
            </form>
        )
    }
    
    render(){

        return(
            <React.Fragment>
                {this.cargarFormulario()}
            </React.Fragment>
        );
    }
}

export default EditarPost;
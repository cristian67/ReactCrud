import React, { Component } from 'react';
//Axios 
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import axios from 'axios';
//Alertas
import Swal from 'sweetalert2';
//Componentes
import Header from './Header';
import Navegacion from './Navegacion';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Formulario from './Formulario';
import EditarPost from './EditarPost';

class Router extends Component{

    state = {
        posts: []
    }

    componentDidMount(){
        this.obtenerPost();
    }

    obtenerPost = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
                .then(resp => {
                    //console.log(resp.data);
                    this.setState({
                        posts: resp.data
                    })
                })
                .catch(error => {
                    console.log(error);
                })
    }
    

    borrarPost = (id) =>{
        //console.log(id);
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(resp => {
                    //verificar status 200
                    //console.log(resp.status);
                    if(resp.status === 200){
                        const posts = [...this.state.posts];
                        //console.log(posts);
                        
                        //filtrar y devolver todos menos el id elegido
                        let resultado = posts.filter(post => (
                            post.id !== Number(id)
                        ));
                        
                        //Guardar
                        this.setState({
                            posts: resultado
                        });
                        
                    }    
                    
                })
    }


    crearPost = (post) => {
        axios.post(`https://jsonplaceholder.typicode.com/posts`, {post})
                .then(resp => {
                    //console.log(resp.data.post);
                    if(resp.status === 201) {
                        Swal(
                            'Post Creado',
                            'Se creo correctamente',
                            'success'
                          )
                        //como viene el id por fuera se van a crear 2 objecto y se van a unir
                        let postId = {id: resp.data.id}
                        const nuevoPost = Object.assign({}, resp.data.post, postId);
                        //console.log(nuevoPost);
                        

                        //Leer post actuales y agregar el nuevo
                        this.setState(prevState => ({
                            posts: [...prevState.posts, nuevoPost]
                        }))
                    }
                })
    }



    editarPost = (postActualizado) => {
        //console.log(postActualizado);
        axios.put(`https://jsonplaceholder.typicode.com/posts/${postActualizado.id}`,{postActualizado})
              .then(resp => {
                  if(resp.status === 200){
                        Swal(
                            'Post Actualizado!',
                            'Los cambios se han guardado',
                            'success'
                        )
                       let postId = resp.data.id;

                       const posts = [...this.state.posts];

                       const postEditar = posts.findIndex(post => postId === post.id);

                       //console.log(posts[postEditar]);

                       posts[postEditar] = postActualizado;

                       this.setState({
                           posts: posts
                       })
                  }
              });
        
    }





    render(){
        return(
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header />
                        <Navegacion />
                        <Switch>
                            <Route exact path="/" render={ () => {
                                 return(
                                     <Posts 
                                        posts = {this.state.posts}
                                        borrarPost = {this.borrarPost} 
                                     />
                                 )
                            }} 
                            /> 

                            <Route exact path ="/post/:id" render={ (props) => {
                                
                                let idPost = props.location.pathname.replace('/post/','');

                                const posts = this.state.posts;
                                
                                let filtro;
                                //filtrar state por el que tenga el idPost
                                filtro = posts.filter( post => (
                                    
                                    post.id === Number(idPost)
                                ))
                                
                                
                                return(
                                    /*  Ver pathname en location para capturar id
                                    console.log(props) */
                                    <SinglePost 
                                        post = {filtro[0]}
                                    />                                    
                                )
                            }}   
                            />

                            <Route exact path="/crear"render={ () => {
                                 return(
                                     <Formulario 
                                        crearPost = {this.crearPost} 
                                     />
                                 )
                            }} 
                            />

                            
                            <Route exact path ="/editar/:id" render={ (props) => {
                                
                                let idPost = props.location.pathname.replace('/editar/','');

                                const posts = this.state.posts;
                                
                                let filtro;
                                //filtrar state por el que tenga el idPost
                                filtro = posts.filter( post => (
                                    
                                    post.id === Number(idPost)
                                ))
                                
                                
                                return(
                                    /*  Ver pathname en location para capturar id
                                    console.log(props) */
                                    <EditarPost
                                        post = {filtro[0]}
                                        editarPost = {this.editarPost}
                                    />                                    
                                )
                            }}   
                            />


                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }

}

export default Router;
import React, { Component } from 'react';
import Listado from './Listado';

class Posts extends Component {
    render(){
        return(
            <div className="col-12 col-md-8">
                <h3 className="text-center">Posts</h3>
                <Listado 
                    posts = {this.props.posts}
                    borrarPost = {this.props.borrarPost}
                />  
            </div>
        );
    }
}

export default Posts;
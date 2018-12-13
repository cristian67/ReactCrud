import React from 'react';
import {Link} from 'react-router-dom';

const Header = () =>{

    return(
        <header className="col-12 col-md-8">
            <Link to={'/'} >
                <h1 className="text-center">React Blog</h1>
            </Link>
        </header>
    )

}
export default Header;
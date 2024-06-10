import React from 'react';
import '../../styles/Header.css';

const Header = () => {
    return(
        <header className='header'>
            <div id='logoDiv'>
                <a href="#">home</a>
            </div>

            <h1> NEWS FEED </h1>

            <div id='buscaDiv'>
                <a href=""><span class="material-symbols-outlined"> search     
                </span> </a> 
            </div>
            
        </header>
    );
};

export default Header;

import { StyledSidebarHeader } from "./style";
import options from '/src/assets/options.svg'
import example from '/src/assets/example.svg'
import React from "react";
import { useState } from "react";





export function SidebarHeader(){

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleShowDropdown = function(){
    setShowDropdown(!showDropdown)
};



    return(
        <StyledSidebarHeader>
            <a href="/profile"><div className="photo"><img src={example} alt="Foto do usuário" height='100%' width='100%'/></div></a>
            <h1 className="title">CHAT</h1>
            <div className="menu">
            <button onClick={toggleShowDropdown} className="buttonMenu">
                <img src={options} alt="opções" width='30px' height='30px'/>
            </button>
           { showDropdown && (<nav className="dropdown" >
               <ul id='caixaLinks' type='none'>
                <li className="caixa"><a className="link" href="#">Adicionar chat</a></li>
                <li className="caixa"><a className="link" href="#">Home Page</a></li>
                <li className="caixa"><a className="link" href="#">News Page</a></li>
               </ul>
            </nav>) }
            </div>
        </StyledSidebarHeader>
    )
}


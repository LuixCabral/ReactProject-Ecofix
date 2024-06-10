import { StyledHeaderPC } from "./style";
import example from '/src/assets/example.svg';
import options from '/src/assets/options.svg';
import { useState } from "react";
import { Link } from "react-router-dom";
import backArrow from '/src/assets/backArrow.svg';

export default function HeaderPrivateChat({chat, onBack}){
    // função de dropdown para o botão de opções 
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleShowDropdown = function(){
    setShowDropdown(!showDropdown)
};
    // fim da função de dropdown
    return(
        <>
        <StyledHeaderPC>
        <button className="backToList" onClick={onBack}> <img src={backArrow} alt="" width='20px' height='20px'/></button>
        <div className="photo"><img src={example} alt="Foto do usuário" height='100%' width='100%'/></div>
            <h1 className="title">{chat.chatName}</h1>
            <div className="menu">
            <button onClick={toggleShowDropdown} className="buttonMenu">
                <img src={options} alt="opções" width='30px' height='30px'/>
            </button>
           { showDropdown &&
              (<nav className="dropdown" >
               <ul id='boxLinks' type='none'>
                <li className="box boxTop"><button className="link">Agendamento</button></li>
                <li className="box"><button className="link" >Finalizar chat</button></li>
               </ul>
            </nav>) }
            </div>
        </StyledHeaderPC>
        </>
    )
}
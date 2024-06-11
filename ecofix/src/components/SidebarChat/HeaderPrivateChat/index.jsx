import { StyledHeaderPC } from "./style";
import example from '/src/assets/example.svg';
import options from '/src/assets/options.svg';
import { useState } from "react";
import backArrow from '/src/assets/backArrow.svg';
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import app from "../../DatabaseConnection";





const db = getFirestore(app);



export default function HeaderPrivateChat({chat, onBack}){

    // função de dropdown para o botão de opções 
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleShowDropdown = function(){
    setShowDropdown(!showDropdown)
};
    // fim da função de dropdown

    // funçao de finalizar chat
    const handleCloseChat = async() => {
        try{
        const confirmation = prompt('Finalizar chat? \n (Digite Sim ou Nao)');
        const validation = confirmation?.toLocaleLowerCase();
        if (validation === 'sim') {
            const chatDocRef = doc(db, 'chats', chat.id);
            await updateDoc(chatDocRef, {status: false});
            onBack();
        }
        } catch (error) {
            console.error('Erro ao atualizar chat: ' , error)
        }        
    }
    // fim da função

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
                <li className="box"><button className="link" onClick={handleCloseChat}>Finalizar chat</button></li>
               </ul>
            </nav>) }
            </div>
        </StyledHeaderPC>
        </>
    )
}




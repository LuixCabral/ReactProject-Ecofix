import { StyledSidebarHeader } from "./style";
import options from '/src/assets/options.svg'
import example from '/src/assets/example.svg'
import React, { useEffect } from "react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDocs, getFirestore, collection, query, where } from 'firebase/firestore';
import app from '../../DatabaseConnection';
import { addChat } from "../ChatsList";
import {Link} from 'react-router-dom' 
import backArrow from '/src/assets/backArrow.svg';





const auth = getAuth(app);
const db = getFirestore(app);



export default function SidebarHeader(){

    // verificação de LogIn
    const [logado, setLogado] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (logado) => {
            if(logado){
                setLogado(logado);
            } else{
                setLogado(null);
            };
        });
        console.log(logado);
        return () => unsubscribe();
        
    },[]);
    // fim da verificação de LogIn


    // função de dropdown para o botão de opções 
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleShowDropdown = function(){
    setShowDropdown(!showDropdown)
};
    // fim da função de dropdown

    // botão para adicionar chats
    const addChatButton = async () => {
        if (logado){
            const emailDigitado = prompt('Digite o e-mail:');
            const validacao = emailDigitado.split('@');
            if(validacao.length == 2){
                const q = query(collection(db, 'usuarios'), where('email', '==', emailDigitado));
                const querySnapshot = await getDocs(q);
                try{
                    if(!querySnapshot.empty){
                        const userDoc = querySnapshot.docs[0];
                        const user2email = userDoc.data().email;
                        const chatID = await addChat(auth.currentUser.email, user2email)

                        const chatAvaliado = localStorage.getItem(`avaliado-${chatID}`);
                        if(chatAvaliado) {
                            localStorage.removeItem(`avaliado-${chatID}`)
                        }
                        console.log('chat adicionado com sucesso. ID: ', chatID);
                    }
                     else {
                        alert('Email não encontrado.')
                    }
                } catch(error){
                    console.error('Erro ao encontrar usuário: ', error);
                }
                
                
            } else {
                alert('Insira um email válido.')
            }
           
           
        } else {
            alert('Você precisa estar logado.');
        }
    }
    // fim de botão

    
    return(
        <StyledSidebarHeader>
            <div className="boxArrowPhoto">
            <button className="backToList"> <Link to='/home'><img src={backArrow} alt="" width='auto' height='20px'/></Link></button>
            <a href="/profile"><div className="photo"><img className='svg' src={example} alt="Foto do usuário" /></div></a>
            </div>
            <h1 className="title">CHAT</h1>
            <div className="menu">
            <button onClick={toggleShowDropdown} className="buttonMenu">
                <img src={options} alt="opções" width='30px' height='30px'/>
            </button>
           { showDropdown &&
              (<nav className="dropdown" >
               <ul id='boxLinks' type='none'>
                <li className="box boxTop"><button className="link" onClick={addChatButton} >Adicionar chat</button></li>
                <li className="box boxBottom"><Link to='/news'><button className="link" >News Page</button></Link></li>
               </ul>
            </nav>) }
            </div>
        </StyledSidebarHeader>
    )
}


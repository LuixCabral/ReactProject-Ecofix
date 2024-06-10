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

const auth = getAuth(app);
const db = getFirestore(app);



export default function SidebarHeader(){
    const [chats, setChats] = useState([]);

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
                        
                        setSelected({id: chatID, participants: [auth.currentUser.email, user2email]})
                        
                        setChats(prevChats => [...prevChats, {id: chatID, participants:[auth.currentUser.email, user2email], chatName: userDoc.data().name}])

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
            <a href="/profile"><div className="photo"><img src={example} alt="Foto do usuário" height='100%' width='100%'/></div></a>
            <h1 className="title">CHAT</h1>
            <div className="menu">
            <button onClick={toggleShowDropdown} className="buttonMenu">
                <img src={options} alt="opções" width='30px' height='30px'/>
            </button>
           { showDropdown &&
              (<nav className="dropdown" >
               <ul id='boxLinks' type='none'>
                <li className="box boxTop"><button className="link" onClick={addChatButton} >Adicionar chat</button></li>
                <li className="box"><Link to='/home'><button className="link" >Home Page</button></Link></li>
                <li className="box boxBottom"><Link to='/news'><button className="link" >News Page</button></Link></li>
               </ul>
            </nav>) }
            </div>
        </StyledSidebarHeader>
    )
}


import { StyledHeaderPC } from "./style";
import example from '/src/assets/example.svg';
import options from '/src/assets/options.svg';
import { useState, useRef, useEffect } from "react";
import backArrow from '/src/assets/backArrow.svg';
import { updateDoc, doc, getFirestore, getDoc, where, deleteDoc, getDocs, collection, query } from "firebase/firestore";
import app from "../../DatabaseConnection";





const db = getFirestore(app);



export default function HeaderPrivateChat({chat, onBack, onCloseChat}){

    // função de dropdown para o botão de opções 
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();
    const buttonMenuRef = useRef();
    const optionsImgRef = useRef();

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
            onCloseChat();
        }
        } catch (error) {
            console.error('Erro ao atualizar chat: ' , error)
        }        
    }
    // fim da função

    const handleDeleteChat = async() => {

        try {
            const confirmation = prompt('Excluir chat?\n(Digite Sim ou Nao)');
            if(confirmation.toLowerCase() ==='sim'){
                const refDocChat = doc(db, 'chats', chat.id);
                const messagesQuery = query(collection(db, 'messages'), where('chatID', '==', chat.id));
                const messagesSnapshot = await getDocs(messagesQuery);
                const deletePromises = messagesSnapshot.docs.map((messageDoc) => deleteDoc(messageDoc.ref));
                await Promise.all(deletePromises);
                await deleteDoc(refDocChat);
                onBack();
                alert('Chat deletado.')
            } else {
                alert('O chat não foi deletado.')
                return
            }
        } catch (error) {
            console.error('Não foi possível deletar o chat: ', error)
        }
            
        }

        useEffect(() => {
            const handleClickOutside = (event) => {
                if(dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target !== buttonMenuRef.current && event.target !== optionsImgRef.current){
                    console.log(event.target)
                    setShowDropdown(false);
                };
            };
    
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            }
    
    
    
        }, [dropdownRef]);

    return(
        <>
        <StyledHeaderPC>
        <button className="backToList" onClick={onBack}> <img src={backArrow} alt="" width='20px' height='20px'/></button>
        <div className="photo"><img src={example} alt="Foto do usuário" height='100%' width='100%'/></div>
            <h1 className="title">{chat.chatName}</h1>
            <div className="menu">
            <button onClick={toggleShowDropdown} className="buttonMenu" ref={buttonMenuRef}>
                <img src={options} alt="opções" width='30px' height='30px' ref={optionsImgRef}/>
            </button>
           { showDropdown &&
              (<nav className="dropdown" ref={dropdownRef}>
               <ul id='boxLinks' type='none'>
                <li className="box boxTop"><button className="link">Agendamento</button></li>
                <li className="box boxMiddle"><button className="link" onClick={handleCloseChat}>Finalizar chat</button></li>
                <li className="box boxBottom"><button className="link" onClick={handleDeleteChat}>Excluir chat</button></li>
               </ul>
            </nav>) }
            </div>
        </StyledHeaderPC>
        </>
    )
}




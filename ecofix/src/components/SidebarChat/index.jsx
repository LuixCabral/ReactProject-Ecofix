import { StyledSidebar } from "./style";
import  SidebarHeader  from "./HeaderChatsList";
import { Chats } from "./ChatsList";
import HeaderPrivateChat from "./HeaderPrivateChat";
import PrivateChat from "./PrivateChat";
import { useEffect, useState } from "react";
import Footer from '../footer/Footer'




export function Sidebar (email){

    //verifica e manipula se chat está abertou ou fechado
    const [chatClosed, setChatClosed] = useState(false);

    // variável que armazena o chat clicado na lista de chats
    const [selectedChat, setSelectedChat] = useState(null);
    
    // armazenando o chat na variável
    const handleChatClick = (chat) => {
        setSelectedChat(chat);
    }

    // função para voltar à lista de chats
    const handleBack = () => {
        setSelectedChat(null);
    }

    // confirmação pelo console se a interação entre a lista de chats e o chat privado está ok
    useEffect(() => {
        if(!selectedChat) {
            console.log('sem chat selecionado, mostrando lista')
        } else{
            console.log('chat selecionado: ', selectedChat)
        }
    },[selectedChat])

    const handleCloseChat = (status) => {
        setChatClosed(status);
    }

    return(
        <>
        
        <StyledSidebar>
            {selectedChat ? (
                <>
                <HeaderPrivateChat chat={selectedChat} onBack={handleBack} onCloseChat={() => handleCloseChat(true)} />       
                <PrivateChat chat={selectedChat} chatClosed={chatClosed} onCloseChat={handleCloseChat}/>
                </>
            )
            :
            (
                <>
                <SidebarHeader email={email}/>
                <Chats onChatClick={handleChatClick}/>
                <Footer></Footer>
                </>
            )}
        </StyledSidebar>
        
        
        
      
        </>
    )
}

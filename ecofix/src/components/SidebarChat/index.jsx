import { StyledBody, StyledSidebar } from "./style";
import  SidebarHeader  from "./HeaderChatsList";
import { Chats } from "./ChatsList";
import HeaderPrivateChat from "./HeaderPrivateChat";
import PrivateChat from "./PrivateChat";
import { useEffect, useState } from "react";
import Footer from '../footer/Footer'




export function Sidebar (){

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


    return(
        <>
        <StyledBody>
        <StyledSidebar>
            {selectedChat ? (
                <>
                <HeaderPrivateChat chat={selectedChat} onBack={handleBack} />       
                <PrivateChat chat={selectedChat} />
                </>
            )
            :
            (
                <>
                <SidebarHeader/>
                <Chats onChatClick={handleChatClick}/>
                <Footer></Footer>
                </>
            )}
        </StyledSidebar>
        </StyledBody>
        
        
      
        </>
    )
}

import { StyledSidebar } from "./style";
import  SidebarHeader  from "./HeaderChatsList";
import { Chats } from "./ChatsList";
import HeaderPrivateChat from "./HeaderPrivateChat";
import PrivateChat from "./PrivateChat";
import { useEffect, useState } from "react";
import Footer from '../footer/Footer'



export function Sidebar (){

    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatClick = (chat) => {
        setSelectedChat(chat);
    }
    const handleBack = () => {
        setSelectedChat(null);
    }

    useEffect(() => {
        if(!selectedChat) {
            console.log('sem chat selecionado, mostrando lista')
        } else{
            console.log('chat selecionado: ', selectedChat)
        }
    },[selectedChat])
    return(
        <>

        <StyledSidebar>
            {selectedChat ? (
                <>
                <HeaderPrivateChat chat={selectedChat} onBack={handleBack}/>
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
        
      
        </>
    )
}

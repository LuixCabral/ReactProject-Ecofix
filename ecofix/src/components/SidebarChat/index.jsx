import { StyledSidebar } from "./style";
import { SidebarHeader } from "./Header/";
import { Chats } from "./Chats";



export function Sidebar (){
    return(
        <>
        <StyledSidebar>
            <SidebarHeader/>
            <Chats/>
        </StyledSidebar>
        
      
        </>
    )
}

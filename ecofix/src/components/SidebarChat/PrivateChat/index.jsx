import { StyledMessagesField } from "./style";
import { StyledInput } from "./style";





export default function PrivateChat(){

    
    

    return(
        <>
        <StyledMessagesField>
        <div className="msgBox">
        <span className="userName">User</span>
        <p className="msg">Mensagem teste</p>
        <span className="time">Time</span>
        </div>      
        </StyledMessagesField>
        <StyledInput>
        <input type="text" className="inputBox" />
        <button className="send">Enviar</button>
        </StyledInput>
        </>
        
    )
}








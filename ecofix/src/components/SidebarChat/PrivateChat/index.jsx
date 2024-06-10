import { StyledMessagesField } from "./style";
import { StyledInput } from "./style";





export default function PrivateChat(){

    
    

    return(
        <>
        <StyledMessagesField>
        <div className="msgBox">
        <span className="userName">User</span>
        <span className="msg">Mensagem teste</span>
        <span className="time">Time</span>
        </div>      
        </StyledMessagesField>
        <StyledInput>
        <input type="text" className="inputBox" placeholder="Digite uma mensagem..." />
        <button className="send">Enviar</button>
        </StyledInput>
        </>
        
    )
}








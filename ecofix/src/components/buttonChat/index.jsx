import { StyledButtonChat } from "./style"
import { Link } from 'react-router-dom'


export default function ButtonChat(){
    return (
        <>
        <Link to='chat/'><StyledButtonChat>Chat</StyledButtonChat></Link>
        </>
    )
}
/* eslint-disable no-undef */
import "../styles/verify.css";
import { useNavigate } from "react-router-dom";
import {sendEmailVerification, getAuth} from "firebase/auth";

export default function VerifyPage(){
    const auth = getAuth();
    const navigate = useNavigate();
    async function sendEmailAgain(){
        const user = auth.currentUser;
        await sendEmailVerification(user);
    }
    return(
        <div id="verPage">
            <h1>Seja bem-vindo à ecofix</h1>
            <h2>CLique no link enviado para o seu email para confirmar seu cadastro!    </h2>
            <h3 onClick={() => navigate('/entrar/')}>Já verificado!</h3>
            <h3 onClick={sendEmailAgain}>Reenviar email!</h3>
        </div>
    )
}
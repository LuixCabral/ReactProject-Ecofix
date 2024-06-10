import '../styles/LoginPage.css';
import { useState, useEffect } from 'react';
import tree from "../assets/tree.png";
import { useNavigate } from 'react-router-dom';
import { getAuth , signInWithEmailAndPassword} from "firebase/auth";
import openedEyeImage from '../assets/opened-eye.svg';
import app from '../components/DatabaseConnection'

function LoginForm(){
    const navigate = useNavigate();
    const auth = getAuth(app);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isClicked , setClicked] = useState(false);

    async function userLogin(){
        await signInWithEmailAndPassword(auth,email,password).then(() => {
            navigate('/home/')
        }).catch(() => {
            setIsValid(false);
            return;
        })

    }
    const notReloadThePageEvent = (event) => {
        event.preventDefault();
    }
    
    
    function updateEmailField(event){
       console.log(email)
       setEmail(event.target.value);
    }

    function updateLoginPasswordField(event){
       setPassword(event.target.value);
    }

    
    return(
        <>
            <h3 id="welcome">Seja bem-vindo</h3>
            <form id="loginForm" onSubmit={notReloadThePageEvent}>
              <label id='emailLabel' htmlFor="emailLogin">Email</label>
              <input type="text" onChange={updateEmailField} id="emailLogin" className="fadeIn second" name="login" />
              <label id='passLabel' htmlFor="passwordLogin">Senha</label>
              <input type="password" id="passwordLogin" onChange={updateLoginPasswordField} className="fadeIn third" name="login" />
              {!isValid && <p>Email ou senha inválidos!</p>}
              <button type="submit" onClick={userLogin} className="fadeIn fourth">Entrar</button>
            </form>
            <h5 className="register">
            Não tem uma conta? <span onClick={() => navigate('/cadastro/')} className="register-link">Registre-se</span>
            </h5>
            
        </>
    )
}
export default LoginForm;
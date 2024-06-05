import { useState } from "react";
import { getAuth , signInWithEmailAndPassword} from "firebase/auth";
import openedEyeImage from '../../assets/opened-eye.svg';
import app from '../DatabaseConnection'
import { useNavigate } from "react-router-dom";


function LoginForm(){
    const navigate = useNavigate();

    const auth = getAuth(app);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

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
            <form onSubmit={notReloadThePageEvent}>
              <input type="text" onChange={updateEmailField} id="email" className="fadeIn second" name="login" placeholder="Email" />
              <input type="password" id="password" onChange={updateLoginPasswordField} className="fadeIn third" name="login" placeholder="Senha" />
              {!isValid && <p>Email ou senha inválidos!</p>}
              <input type="submit" onClick={userLogin} className="fadeIn fourth" value="Entrar" />
            </form>
        </>
    )
}
export default LoginForm;
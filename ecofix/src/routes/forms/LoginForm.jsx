import "../../styles/loginform.scss"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth , signInWithEmailAndPassword} from "firebase/auth";
import app from '../../components/DatabaseConnection'
import openedEyeImage from '../../assets/opened-eye.svg';
function LoginForm(){
    const navigate = useNavigate();

    const auth = getAuth(app);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isClicked , setClicked] = useState(false);

    async function userLogin(){
        await signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            if(user.emailVerified){
                navigate('/home/');
                return;
            }
            navigate('/confirmar-email/')
            
        }).catch(() => {
            setIsValid(false);
            return;
        })
        return;
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
<div className="login-container">
            <h2>Login</h2>
            <form onSubmit={notReloadThePageEvent} method="post">
                <div className="form-group">
                    <label htmlFor="emailLogin">Email:</label>
                    <input onChange={updateEmailField} type="email" id="emailLogin" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordLogin">Senha:</label>
                    <input onChange={updateLoginPasswordField} type="password" id="passwordLogin" name="password" required />
                </div>
                <div className="form-group">
                    <button onClick={userLogin} id="btnSubmit">Login</button>
                </div>
                <div className="form-group">
                   <a className="forgot-password"onClick={() => navigate('/esqueci-minha-senha')}>Esqueci minha senha</a>
                </div>
            </form>
        </div>
    )
}
export default LoginForm;
import  '../../styles/reg.css';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc,getFirestore } from "firebase/firestore";
import openedEyeImage from '../../assets/opened-eye.svg';
import closedEyeImage from "../../assets/closed-eye.svg";
import selectedradio from "../../assets/selectedradio.png";
import unselectedradio from "../../assets/unselectedradio.png"
import app from '../../components/DatabaseConnection'
import art from '../../assets/art.png'
import {useNavigate} from 'react-router-dom'
export default function RegisterForm(){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [check, setCheck] = useState(true);
    const [confirmCheck, setConfirmCheck] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
    const [isRegisterDone, setRegisterDone] = useState(false);
    const [role, setRole] = useState("usuario");
    const [name, setName] = useState("");
    const [eyeState, setEye] = useState(closedEyeImage);
    const [confirmEyeState, setConfirmEye] = useState(closedEyeImage);
    const notReloadThePageEvent = (event) => event.preventDefault();
    
    function passwordsMatch() {
        return password === confirmPassword;
      }
    
      function isEmailValid(){
        try {
          email.split('@')[1].split('.');
        } catch (error) {
          setEmailError(true);
        }
        if(emailError == true){
          return false;
        }
    
        let isInWhiteList = false;
        let invalideMail = email.split('@')[1].split('.').length !== 2 && email.split('@').length !== 2;
        if (invalideMail) {
            setEmailError(true);
            return false;
        }
    
        for (let index = 0; index < mailWhiteList.length; index++) {
            isInWhiteList = email.includes(mailWhiteList[index]);
            if(isInWhiteList){
                return true;
            }
        }
        setEmailError(true);
        return false;
        }
        
        async function handleSignup() {
        if (!isEmailValid() || !passwordsMatch()) {
    
          return;
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userID = userCredential.user.uid;
        const user = userCredential.user;
        try {
          
          await sendEmailVerification(user);
          sessionStorage.setItem("email",email);
        } catch (error) {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            setEmailExists(true);
          } else {
    
            console.error("Erro ao criar a conta:", error);
          }
          return; 
        }
      
    
        try {
          await setDoc(doc(dataBase, "usuarios", userID), {
            name: name,
            role: role,
            uid: userID,
            verified: false,
            email: email,
          });
        } catch (error) {
          console.error("Erro ao criar o documento do usuário:", error);
    
        }
      
        navigate('/confirmar-email/')
        setRegisterDone(true);
      }
      
    
      const updateEmailField = (event) => {
        setEmailExists(false);
        setEmailError(false);
        setEmail(event.target.value);
      };
    
      function changePassType() {
        setCheck(!check);
        document.getElementById("password").type = check ? "password" : "text";
        if(eyeState == openedEyeImage){
          setEye(closedEyeImage);
          return
        }
        setEye(openedEyeImage);
      }
      function changeConfirmPassType(){
        setConfirmCheck(!confirmCheck);
        document.getElementById("confirmpassword").type = confirmCheck ? "password" : "text";
        if(confirmEyeState == openedEyeImage){
          setConfirmEye(closedEyeImage);
          return;
        }
        setConfirmEye(openedEyeImage);
        return;
      }
      function changeName(event){
        setName(event.target.value)
      }
    
      function roleSelection(event){
    
        if(event.target.id == 'user' || event.target.id == 'commonUser'){
            setRole("User");
            document.getElementById('user').style.color = "green";
            document.getElementById('commonUser').src = selectedradio;
    
            document.getElementById('specialistRole').style.color = "black";
            document.getElementById('specialist').src = unselectedradio;
            return;
        }
        setRole("Specialist")
    
        document.getElementById('user').style.color = "black";
        document.getElementById('commonUser').src = unselectedradio;
        
        document.getElementById('specialistRole').style.color = "green";
        document.getElementById('specialist').src = selectedradio;
      }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 6) {
            setPasswordError('A senha deve conter no mínimo 6 caracteres');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setPasswordError('As senhas não correspondem');
        } else {
            setPasswordError('');
        }
    };
    return(
        <div className="signup-container">
            <h2>Cadastro</h2>
            <form action="/signup" method="post">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="emailSignup">Email:</label>
                    <input type="email" id="emailSignup" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="userType">Tipo de Usuário:</label>
                    <select id="userType" name="userType" required>
                        <option value="normal">Normal</option>
                        <option value="especialista">Especialista</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordSignup">Senha:</label>
                    <input 
                        type="password" 
                        id="passwordSignup" 
                        name="password" 
                        required 
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Senha:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        required 
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                {passwordError && <p id="passwordError" className="error">{passwordError}</p>}
                <div className="form-group">
                    <button type="submit" id="btnSignup">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}
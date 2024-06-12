/* eslint-disable no-undef */
import  '../styles/reg.css';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc,getFirestore } from "firebase/firestore";
import openedEyeImage from '../assets/opened-eye.svg';
import closedEyeImage from "../assets/closed-eye.svg";
import selectedradio from "../assets/selectedradio.png";
import unselectedradio from "../assets/unselectedradio.png"
import app from '../components/DatabaseConnection'
import art from '../assets/art.png'
import {useNavigate} from 'react-router-dom'

function RegisterForm() {
  const navigate = useNavigate();
  const dataBase = getFirestore(app)
  const auth = getAuth();
  const mailWhiteList = [
    "@somosicev.com",
    "@hotmail.com",
    "@gmail.com",
    "@yahoo.com",
    "@outlook.com",
    "@proton.me",
    "@icloud.com",
    "@aol.com",
    "@mail.com",
    "@zoho.com",
    "@gmx.com",
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [check, setCheck] = useState(true);
  const [confirmCheck, setConfirmCheck] = useState(true);
  const [emailExists, setEmailExists] = useState(false);
  const [isRegisterDone, setRegisterDone] = useState(false);
  const [role, setRole] = useState("usuario");
  const [name, setName] = useState("");
  const [passwordError,setPasswordError] = useState(false);
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

    return (
        <>
        
        <div className="wrapper fadeInDown">
          <img id="art" src={art} alt="" srcSet={art} />
          {!isRegisterDone ? (
            <>
            <form onSubmit={notReloadThePageEvent}>
              <label htmlFor="name" id="name-label">Nome:</label>
              <input
                type="text"
                placeholder="Digite seu nome!"
                id="name"
                onChange={(event) => changeName(event)}
              />
            <label htmlFor="email" id="email-label">Email</label>
              <input
                id="email"
                placeholder="Digite seu email"
                onChange={updateEmailField}
                type="text"
              />
              {emailError && <p className="mailError">Email Inválido!</p>}
              {emailExists && <p className="mailError">Email já cadastrado!</p>}
              <p className='question'>Deseja se cadastrar como especialista?</p>
              <ul type="none" id="role">
                <li className='specialist'>
                    <img onClick={roleSelection}  src={unselectedradio} name="specialistRole" id="specialist"/>
                    <label onClick={roleSelection} htmlFor="specialist" id="specialistRole">Sim, sou especialista em sustentabilidade!</label>
                </li>
                <li className='user'>
                    <img onClick={roleSelection} src={selectedradio} name="userRole" id="commonUser"/>
                    <label onClick={roleSelection} htmlFor="commonUser" id="user">Não, eu não sou um especialita! </label>
                </li>
              </ul>
              
              <label id="password-label">Senha</label>
                <input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  type={check ? "password" : "text"}
                />
                  {passwordError ? <p className="msgError">Senha deve conter pelo menos 6 caracteres!</p> : <p className="msgPass">Sua senha deve conter pelo menos 6 caracteres!</p>}
                <img
                  onClick={changePassType}
                  className="eye"
                  rel="icon"
                  type="image/svg+xml"
   
                  src={eyeState}
                  style={{ cursor: 'pointer' }}
                />
              
              <label id="confirmpassword-label">Confirmação de senha:</label>
              <input
                onChange={(event) => setConfirmPassword(event.target.value)}
                id="confirmpassword"
                value={confirmPassword}
                placeholder="Digite novamente sua senha"
                type={confirmCheck ? "password" : "text"}

              />
              <img
                onClick={changeConfirmPassType}
                className="confirmEye"
                rel="icon"
                type="image/svg+xml"
  
                src={confirmEyeState}
                style={{ cursor: 'pointer' }}
              />

        {!passwordsMatch() && <p className="messageError">Senhas não coincidem!</p>}

        <button onClick={handleSignup} type="submit" className='fadeIn register'>Cadastrar</button>
       
        </form>
        <h3 className='loginBtn'>Já tem uma conta?<span onClick={() => navigate('/entrar/')}>Entrar</span></h3></>
        ):(
        <div>
            <h1 className="fadeIn first">Cadastrado com sucesso!</h1>
        </div>
        )}
        </div>
   </>
 );
}
export default RegisterForm;

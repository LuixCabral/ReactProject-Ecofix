/* eslint-disable no-undef */
import  '../styles/reg.css';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,getFirestore } from "firebase/firestore";
import openedEyeImage from '../assets/opened-eye.svg';
import app from '../components/DatabaseConnection'
import art from '../assets/art.png'
import {useNavigate} from 'react-router-dom'

function RegisterForm() {
  const navigate = useNavigate();
  const dataBase = getFirestore(app)
  const auth = getAuth();
  const mailWhiteList = [
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
  const [emailExists, setEmailExists] = useState(false);
  const [isRegisterDone, setRegisterDone] = useState(false);
  const [role, setRole] = useState("usuario");
  const [name, setName] = useState("");
  const [passwordError,setPasswordError] = useState(false);
  const notReloadThePageEvent = (event) => event.preventDefault();

  function passwordsMatch() {
    return password === confirmPassword;
  }

  function isEmailValid(){
    let isInWhiteList = false;
    let invalideMail = email.split('@')[1].split('.').length !== 2;
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
    
    console.log(isEmailValid() && passwordsMatch());
    if (isEmailValid() && passwordsMatch()) {
      createUserWithEmailAndPassword(auth,email,password).then(async(userCredential)=>{
        const userID = userCredential.user.uid;
        console.log("id",userID)
        await setDoc(doc(dataBase,"usuarios",userID),{
          name:name,
          role:role,
          uid:userID,
          verified: false,
          email:email,                                  
        });
        setRegisterDone(true);
      }).catch((error) => {
        const errorCode = error.code;
        errorCode == errorCode[1]?setEmailError(true):setPasswordError(true);
      });
    }
  }

  const updateEmailField = (event) => {
    setEmailExists(false);
    setEmailError(false);
    setEmail(event.target.value);
  };

  function changePassType() {
    setCheck(!check);
    // eslint-disable-next-line no-undef
    document.getElementById("passwordfield").type = check ? "password" : "text";
  }

  function focus() {
    // eslint-disable-next-line no-undef
    document.getElementById("passwordfield").focus();
  }


  function changeName(event){
    setName(event.target.value)
  }

  function roleSelection(event){

    if(event.target.id == 'user' || event.target.id == 'commonUser'){
        setRole("User");
        document.getElementById('user').style.color = "green";
        document.getElementById('commonUser').checked = true;

        document.getElementById('specialistRole').style.color = "black";
        document.getElementById('specialist').checked = false;
        return;
    }
    setRole("Specialist")

    document.getElementById('user').style.color = "black";
    document.getElementById('commonUser').checked = false;
    
    document.getElementById('specialistRole').style.color = "green";
    document.getElementById('specialist').checked = true;
  }

    return (
        <body>
        
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
              {emailError && <p className="messageError">Email Inválido!</p>}
              {emailExists && <p className="messageError">Email já cadastrado!</p>}
              <p className='question'>Deseja se cadastrar como especialista?</p>
              <ul type="none" id="role">
                <li className='specialist'>
                    <input onClick={roleSelection}  type="radio" name="specialistRole" id="specialist"/>
                    <label onClick={roleSelection} htmlFor="specialist" id="specialistRole">Sim, sou especialista em sustentabilidade!</label>
                </li>
                <li className='user'>
                    <input onClick={roleSelection} type="radio" name="userRole" id="commonUser"/>
                    <label onClick={roleSelection} htmlFor="commonUser" id="user">Não, quero me cadastrar como um usuário comum! </label>
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
                  {passwordError ? <p className="msgError">Senha deve conter pelo menos 6 caracteres!</p> : <p className="msgPass">Senha deve conter pelo menos 6 caracteres!</p>}
                <img
                  onClick={changePassType}
                  className="eye"
                  rel="icon"
                  type="image/svg+xml"
                  src={openedEyeImage}
                  style={{ cursor: 'pointer' }}
                />
              
              <label id="confirmpassword-label">Confirmação de senha:</label>
              <input
                onChange={(event) => setConfirmPassword(event.target.value)}
                id="confirmpassword"
                value={confirmPassword}
                placeholder="Digite novamente sua senha"
                type="password"
              />
        {!passwordsMatch() && <p className="messageError">Senhas não coincidem!</p>}

        <button onClick={handleSignup} type="submit" className='fadeIn register'>Cadastrar</button>
       
        </form>
        <h3>Já tem uma conta?<span onClick={() => navigate('/entrar/')}>Login</span></h3></>
        ):(
        <div>
            <h1 className="fadeIn first">Cadastrado com sucesso!</h1>
        </div>
        )}
        </div>
   </body>
 );
}
export default RegisterForm;

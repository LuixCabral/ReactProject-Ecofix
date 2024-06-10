import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,getFirestore } from "firebase/firestore";
import openedEyeImage from '../../assets/opened-eye.svg';
import app from '../DatabaseConnection'


function RegisterForm() {
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

  function changeRole(event){
    setRole(event);
  }

  function changeName(event){
    setName(event.target.value)
  }
    return (
        <>
        {!isRegisterDone ? (
        <form onSubmit={notReloadThePageEvent}>
        <input type="text" placeholder="Digite seu nome!" id="name" onChange={(event) => changeName(event)}/>
        <input
            id="email"
            placeholder="Digite seu email"
            onChange={updateEmailField}
            type="text"
        />
        {emailError && <p className="messageError">Email Inválido!</p>}
        {emailExists && <p className="messageError">Email já cadastrado!</p>}
        <select onChange={(event) => changeRole(event.target.value)} id="role" name="role">
          <option value="usuario">Usuário</option>
          <option value="especialista">Especialista</option>
        </select>
        <div id="password" onClick={focus}>
            <input
            id="passwordfield"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua senha"
            type={check ? "password" : "text"}
            />
            <img
            onClick={changePassType}
            className="eye"
            rel="icon"
            type="image/svg+xml"
            src={openedEyeImage}
            />
        </div>
        {passwordError ?<p className="messageError">Senha deve conter pelo menos 6 caracteres!</p>:<p className="messagePass">Senha deve conter pelo menos 6 caracteres!</p>}
        <input
            onChange={(event) => setConfirmPassword(event.target.value)}
            id="confirmpassword"
            value={confirmPassword}
            placeholder="Digite novamente sua senha"
            type="password"
        />
        {!passwordsMatch() && <p className="messageError">Senhas não coincidem!</p>}
        <input type="submit" onClick={handleSignup} className="fadeIn fourth" value="Cadastrar" />
        </form>):(
        <div>
            <h1 className="fadeIn first">Cadastrado com sucesso!</h1>
        </div>
        )}
   </>
 );
}
export default RegisterForm;

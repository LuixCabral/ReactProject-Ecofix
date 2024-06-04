import { useState,useEffect } from "react"
import RegisterForm from "./forms/RegisterForm";
// eslint-disable-next-line react/prop-types
export default function ChangeForm({isLoginClicked}){

    const [profiles, setProfiles] = useState([]);
    const [loginPassword, setLoginPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
 
     const notReloadThePageEvent = (event) => {
         event.preventDefault();
     }
     
     
     function updateEmailField(event){
        console.log(email)
        setEmail(event.target.value);
     }

     function updateLoginPasswordField(event){
        setLoginPassword(event.target.value);
     }
    return (
        <div>
        
          {!isLoginClicked ? (
            <RegisterForm/>
          ) : (
            <form onSubmit={notReloadThePageEvent}>
              <input type="text" onChange={updateEmailField} id="email" className="fadeIn second" name="login" placeholder="Email" />
              <input type="password" id="password" onChange={updateLoginPasswordField} className="fadeIn third" name="login" placeholder="Senha" />
              <input type="submit" className="fadeIn fourth" value="Entrar" />
            </form>
          )
          
          }
        </div>
      );
    }
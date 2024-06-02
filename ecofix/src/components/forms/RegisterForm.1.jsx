import { useState } from "react";
import LoginPage from "../../routes/LoginPage"
import { supabase } from "../DatabaseConnection";
function RegisterForm() {
    function checkEmailWhiteList(i){
        
        if(email.includes(mailWhiteList[i])){
            return true;
        }
        if (i < mailWhiteList.length){
            i += 1;
            console.log(mailWhiteList[i]);
            checkEmailWhiteList(i);
        }
        return false;
    }
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
    "@gmx.com"]

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(true);
    const notReloadThePageEvent = (event) => {
        event.preventDefault();
    };

    function passwordsMatch() {
        console.log(password === confirmPassword)
        if (password === confirmPassword) {
            return true;
        }
        return false;
    } 
    const handleSubmit = async () => {
        checkEmailWhiteList(0) == false ? setEmailError(true) : setEmailError(false);
        console.log(emailError, " " , password, confirmPassword);
        if(!emailError && passwordsMatch()){

            /*await supabase.auth.signUp(
                {email: email, password: password}
            );*/
            
        }
    }
    const updateEmailField = (event) => {
        setEmail(event.target.value);
        console.log(email);
    }
    return (
        <form onSubmit={notReloadThePageEvent}>
            <div id='email'>
                <input id="emailfield" placeholder="Digite seu email" onChange={updateEmailField} type="text" />
                {emailError && <p>Email Inválido!</p>}
                <img className="eye" rel="icon" type="image/svg+xml" href="assets/opened-eye.svg" />
            </div>
            <div id="password">
                <input id="passwordfield" value={password} onChange={((event)=>setPassword(event.target.value))} placeholder="Digite sua senha" type="password" />
            </div>
            <input onChange={(event)=>setConfirmPassword(event.target.value)} id="confirmpassword" value={confirmPassword} placeholder="Digine novamente sua senha" type="password" />
            {!passwordsMatch() && <p>Senhas não coincidem!</p>}
            <input type="submit" onClick={handleSubmit} className="fadeIn fourth" value="Cadastrar" />
        </form>
    );
}

export default RegisterForm;
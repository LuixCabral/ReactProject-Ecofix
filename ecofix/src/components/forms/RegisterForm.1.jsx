import { useState } from "react";
import { supabase } from "../DatabaseConnection";
import openedEyeImage from '../../assets/opened-eye.svg';

function RegisterForm() {
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
  const [emailError, setEmailError] = useState(true);
  const [check, setCheck] = useState(true);

  const notReloadThePageEvent = (event) => event.preventDefault();

  function passwordsMatch() {
    return password === confirmPassword;
  }

  function isEmailValid(){
    let isInWhiteList = false;
    for (let index = 0; index < mailWhiteList.length; index++) {
        isInWhiteList = email.includes(mailWhiteList[index]);
        if(isInWhiteList){
            return true;
        }
    }
    return false;
  }
  async function handleSignup(email, password) {
    

    if (isEmailValid() && passwordsMatch()) {
      try {
        await supabase.from('profiles').ffds

        if (error) {
          // Handle specific errors (e.g., email already exists, etc.)
          console.error("Signup failed:", error.error_description || error.message);
          // Show user-friendly error message based on error code
        } else {
          console.log("Signup successful!", user);
          // Redirect to confirmation page or perform other actions
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const updateEmailField = (event) => {
    setEmail(event.target.value);
  };

  function changePassType() {
    setCheck(!check);
    document.getElementById("passwordfield").type = check ? "password" : "text";
  }

  function focus() {
    // eslint-disable-next-line no-undef
    document.getElementById("passwordfield").focus();
  }

  return (
    <form onSubmit={notReloadThePageEvent}>
      <input
        id="email"
        placeholder="Digite seu email"
        onChange={updateEmailField}
        type="text"
      />
      {emailError && <p>Email Inválido!</p>}
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
      <input
        onChange={(event) => setConfirmPassword(event.target.value)}
        id="confirmpassword"
        value={confirmPassword}
        placeholder="Digite novamente sua senha"
        type="password"
      />
      {!passwordsMatch() && <p>Senhas não coincidem!</p>}
      <input type="submit" onClick={handleSignup} className="fadeIn fourth" value="Cadastrar" />
    </form>
  );
}

export default RegisterForm;

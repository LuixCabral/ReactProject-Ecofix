/* eslint-disable no-undef */
import '../../styles/reg.css';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import openedEyeImage from '../../assets/opened-eye.svg';
import closedEyeImage from "../../assets/closed-eye.svg";
import app from '../../components/DatabaseConnection';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState('');
    const [check, setCheck] = useState(true);
    const [confirmCheck, setConfirmCheck] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
    const [isRegisterDone, setRegisterDone] = useState(false);
    const [role, setRole] = useState("usuario");
    const [name, setName] = useState("");
    const [eyeState, setEye] = useState(closedEyeImage);
    const [confirmEyeState, setConfirmEye] = useState(closedEyeImage);
    const notReloadThePageEvent = (event) => event.preventDefault();
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
    ];

    function passwordsMatch() {
        return password === confirmPassword;
    }

    function isEmailValid() {
        try {
            email.split('@')[1].split('.');
        } catch (error) {
            setEmailError("Formato de e-mail inválido.");
            return false;
        }
        let isInWhiteList = false;
        let invalideMail = email.split('@')[1].split('.').length !== 2 && email.split('@').length !== 2;
        if (invalideMail) {
            setEmailError("Formato de e-mail inválido.");
            return false;
        }
        for (let index = 0; index < mailWhiteList.length; index++) {
            isInWhiteList = email.includes(mailWhiteList[index]);
            if (isInWhiteList) {
                return true;
            }
        }
        setEmailError("E-mail não está na lista permitida.");
        return false;
    }

    async function handleSignup() {
        if (!isEmailValid() || !passwordsMatch()) {
            return;
        }
        
        
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const userID = userCredential.user.uid;
          const user = userCredential.user;
          await sendEmailVerification(user);
          sessionStorage.setItem("email", email);
          await setDoc(doc(dataBase, "usuarios", userID), {
              name: name,
              role: role,
              uid: userID,
              email: email,
          });
        } catch (error) {
          const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                setEmailError('Email já está cadastrado!');
            } else {
                setEmailError('Algo deu errado, tente novamente mais tarde!')
            }
            return;
        }
        navigate('/confirmar-email/')
        setRegisterDone(true);
    }

    const updateEmailField = (event) => {
        setEmailExists(false);
        setEmailError('');
        setEmail(event.target.value);
    };

    function changePassType() {
        setCheck(!check);
        document.getElementById("passwordSignup").type = !check ? "password" : "text";
        if (eyeState == openedEyeImage) {
            document.getElementsByClassName('eye')[0].style = "";
            setEye(closedEyeImage);
            return;
        }
        setEye(openedEyeImage);
        document.getElementsByClassName('eye')[0].style = "width:35px;top:-31px"
    }
    function changeConfirmPassType() {
        setConfirmCheck(!confirmCheck);
        document.getElementById("confirmPassword").type = !confirmCheck ? "password" : "text";
        if (confirmEyeState == openedEyeImage) {
            document.getElementsByClassName('confirm-eye')[0].style = "";
            setConfirmEye(closedEyeImage);
            return;
        }
        setConfirmEye(openedEyeImage);
        document.getElementsByClassName('confirm-eye')[0].style = "width:35px;top:-31px"
    }

    function changeName(event) {
        setName(event.target.value)
    }

    function roleSelection(event) {
        if (event.target.value == 'user') {
            setRole("User");
            return;
        }
        setRole("Specialist")
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
    return (
        <div className="signup-container">
            <h2>Cadastro</h2>
            <form onSubmit={notReloadThePageEvent} method="post">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input onChange={changeName} type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="emailSignup">Email:</label>
                    <input onChange={updateEmailField} type="email" id="emailSignup" name="email" required />
                    {emailError && <p id="emailError" className="error">{emailError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="userType">Tipo de Usuário:</label>
                    <select onChange={roleSelection} id="userType" name="userType" required>
                        <option id="user" value="user">Usuário Comum</option>
                        <option id="specialist" value="specialist">Especialista</option>
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
                    <img onClick={changePassType} className='eye' src={eyeState} />
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
                    <img src={confirmEyeState} className='confirm-eye' onClick={changeConfirmPassType} />
                </div>
                {passwordError && <p id="passwordError" className="error">{passwordError}</p>}
                <div className="form-group">
                    <button onClick={handleSignup} type="submit" id="btnSignup">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}
``

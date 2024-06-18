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
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState('');
    const [check, setCheck] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
    const [role, setRole] = useState("usuario");
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [location, setLocation] = useState("");
    const [eyeState, setEye] = useState(closedEyeImage);
    const notReloadThePageEvent = (event) => event.preventDefault();
    const navigate = useNavigate();
    const dataBase = getFirestore(app);
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
        if (!isEmailValid()) {
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
                location: location,
                specialty: role === "Specialist" ? specialty : ""
            });
        } catch (error) {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                setEmailError('Email já está cadastrado!');
                document.getElementById("emailSignup").value = "";
                document.getElementById("emailSignup").style.borderColor = "red";

            } else {
                setEmailError('Algo deu errado, tente novamente mais tarde!')
            }
            return;
        }
        navigate('/confirmar-email/');
        setRegisterDone(true);
    }

    const updateEmailField = (event) => {
        document.getElementById("emailSignup").style.borderColor = "black";
        setEmailExists(false);
        setEmailError('');
        setEmail(event.target.value);
    };

    function changePassType() {
        setCheck(!check);
        document.getElementById("passwordSignup").type = !check ? "password" : "text";
        if (eyeState === openedEyeImage) {
            document.getElementsByClassName('eye')[0].style = "";
            setEye(closedEyeImage);
            return;
        }
        setEye(openedEyeImage);
        document.getElementsByClassName('eye')[0].style = "width:35px;top:-31px";
    }

    function handleRoleChange(event) {
        setRole(event.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 6) {
            setPasswordError('A senha deve conter no mínimo 6 caracteres');
        } else {
            setPasswordError('');
        }
    };

    return (
        <div className="signup-container">
            <h2>Cadastro</h2>
            <form onSubmit={notReloadThePageEvent} method="post">
                <div className="form-group">
                    <label htmlFor="firstName">Nome:</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" id="firstName" name="name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="emailSignup">Email:</label>
                    <input onChange={updateEmailField} style={{color:"black"}}  placeholder={!emailExists ? emailError:""} type="email" id="emailSignup" name="email" required />
    
                </div>
                <div className="form-group">
                    <label htmlFor="userType">Tipo de Usuário:</label>
                    <select onChange={handleRoleChange} id="userType" name="userType" required>
                        <option value="usuario">Usuário Comum</option>
                        <option value="Specialist">Especialista</option>
                    </select>
                </div>
                {role === "Specialist" && (
                    <div className="form-group">
                        <label htmlFor="specialty">Especialidade:</label>
                        <input onChange={(e) => setSpecialty(e.target.value)} type="text" id="specialty" name="specialty" required />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="location">Cidade:</label>
                    <input onChange={(e) => setLocation(e.target.value)} type="text" id="location" name="location" required />
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
                {passwordError && <p id="passwordError" className="error">{passwordError}</p>}
                <div className="form-group">
                    <button onClick={handleSignup} type="submit" id="btnSignup">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

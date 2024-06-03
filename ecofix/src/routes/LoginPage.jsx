import '../styles/LoginPage.css'
import ChangeForm from '../components/ChangeForm';
import { useState, useEffect } from 'react';

export default function LoginPage(){
    const [isLoginClicked, setLoginClicked] = useState(true);
    
    let switchForm = (event) => {
        // eslint-disable-next-line no-undef
        const signIn = document.getElementById('signin');
        // eslint-disable-next-line no-undef
        const signUp = document.getElementById('signup');

        event.preventDefault();
        if(event.target.innerHTML == ' Entrar '){
            setLoginClicked(true);
        }else{
            setLoginClicked(false);
        }

        // eslint-disable-next-line no-undef
        if(isLoginClicked == true){
            signIn.className = 'active'
            signUp.className = 'inactive underlineHover'
        }else{
            signIn.className = 'inactive underlineHover'
            signUp.className = 'active'
        }
    }
    useEffect(() => {
        console.log('ChangeForm re-rendered');
      }, [isLoginClicked]);

    
    return(
        <body>
            <div className="wrapper fadeInDown">
                <div id="formContent">

                    <h2 id="signin" onClick={switchForm} className={isLoginClicked ? 'active' : 'inactive underlineHover'}> Entrar </h2>
                    <h2 id="signup" onClick={switchForm} className={isLoginClicked ? 'inactive underlineHover' : 'active'}>Cadastrar </h2>
                    <ChangeForm isLoginClicked={isLoginClicked} />
                    <div className="fadeIn first">0drr
                        <div id="formFooter">
                        <a className="underlineHover" href="#">Esqueceu a senha?</a>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        
    )
}
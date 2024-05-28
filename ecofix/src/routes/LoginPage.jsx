import '../styles/LoginPage.css'
import { useEffect, useState } from 'react';
import {supabase} from '../components/DatabaseConnection'

export default function LoginPage(){
    const[isLoginClicked, setLoginClicked] = useState(true);
    const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [profiles, setProfiles] = useState([]);

   //Não remova o colchete vazio: causará um loop ->.
    useEffect(() => {
        getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function getProfiles() {
        //not working yet
        const {data} = await supabase.from('profiles').select();
        setProfiles(data);
        console.log("this: " ,profiles)
    }

    let changeToSignUp = (event) =>{
        event.preventDefault();
        setLoginClicked(false);
    }
    const notReloadThePageEvent = (event) => {
        event.preventDefault();
    }

    function changeForm(){
        //incompleto
        if(isLoginClicked == true){
            <form onSubmit={notReloadThePageEvent}>
                <input type="text" />
                <input type="password" />
                <input type="text" />
            </form>
        }
        <form onSubmit={notReloadThePageEvent} >
            <input type="text" id="login" className="fadeIn second" name="login" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <input type="password" id="password" className="fadeIn third" name="login" placeholder="Senha"/>
            <input type="submit" className="fadeIn fourth" value="Log In"/>
        </form> 
    }
    
    return(
        <body>
            <div className="wrapper fadeInDown">
            <div id="formContent">

                <h2 className="active"> Entrar </h2>
                <h2 onClick={changeToSignUp} className="inactive underlineHover">Cadastrar </h2>


                <div className="fadeIn first">
                <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
                </div>
                    <changeForm/>
                <div id="formFooter">
                <a className="underlineHover" href="#">Esqueceu a senha?</a>
                </div>

            </div>
            </div>
        </body>
        
    )
}
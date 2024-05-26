import '../styles/LoginPage.css'
import { useEffect, useState } from 'react';
import { supabase } from '../components/DatabaseConnection';

export default function LoginPage(){
    const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [profiles, setProfiles] = useState([]);

   //Não remova o colchete vazio: causará um loop.
    useEffect(() => {
        getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function getProfiles() {
        const {data} = await supabase.from('profiles').select().eq('username', 'lucas');
        setProfiles(data);
        console.log("this: " ,profiles)
    }

    const handleEvent = (event) => {
        event.preventDefault();
    }

    return(
        <body>
        <section className="container">
            <div className="login-container">
                <div className="circle circle-one"></div>
                <div className="form-container">
                    <h1 className="opacity">Bem-vindo a ecofix</h1>
                    <form onSubmit={handleEvent}>
                        <input type="text" placeholder="USERNAME" value={email} onChange={e => setEmail(e.target.value)}/>

                        <input type="password" placeholder="PASSWORD"/>
                        <button type='submit' className="opacity">Entrar</button>
                    </form>
                    <div className="register-forget opacity">
                        <a href="">Cadastrar-se</a>
                        <a href="">Esqueci minha senha</a>
                    </div>
                </div>
            </div>
            <div className="theme-btn-container"></div>
        </section>
        </body>
    )
}
import { useState,useEffect } from "react"
import { supabase } from "./DatabaseConnection";

// eslint-disable-next-line react/prop-types
export default function ChangeForm({isLoginClicked}){

    const [profiles, setProfiles] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    //const [email, setEmail] = useState('');
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

     const notReloadThePageEvent = (event) => {
         event.preventDefault();
     }
     
     function changeConfirmPassword(event){
        //Por algum motivo o label de confirmar senha colocava um "value", por isso eu criei essa função, atualiza os valores corretamente
        setConfirmPassword(event.target.value);
     }

    return (
        <div>
        
          {!isLoginClicked ? (
            <form onSubmit={notReloadThePageEvent}>
              <input id="email" placeholder="Digite seu email" type="text" />
              <input id="password" placeholder="Digite sua senha" type="password" />
              <input onChange={changeConfirmPassword} id="confirmpassword" value={confirmPassword} placeholder="Digine novamente sua senha" type="password" />
              <input type="submit" className="fadeIn fourth" value="Cadastrar" />
            </form>
          ) : (
            <form onSubmit={notReloadThePageEvent}>
              <input type="text" id="email" className="fadeIn second" name="login" placeholder="Email" />
              <input type="password" id="password" className="fadeIn third" name="login" placeholder="Senha" />
              <input type="submit" className="fadeIn fourth" value="Entrar" />
            </form>
          )
          
          }
        </div>
      );
    }
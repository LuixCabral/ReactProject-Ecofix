import { useState,useEffect } from "react"
import { supabase } from "./DatabaseConnection";

export default function ChangeForm({isLoginClicked}){

    const [profiles, setProfiles] = useState([]);
    const [email, setEmail] = useState('');
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
    //incompleto
    return (
        <div>
          {isLoginClicked ? (
            <form onSubmit={notReloadThePageEvent}>
              <input placeholder="value" type="text" />
              <input placeholder="pass" type="password" />
              <input placeholder="confirm pass" type="text" />
            </form>
          ) : (
            <form onSubmit={notReloadThePageEvent}>
              <input type="text" id="login" className="fadeIn second" name="login" placeholder="Email" />
              <input type="password" id="password" className="fadeIn third" name="login" placeholder="Senha" />
              <input type="submit" className="fadeIn fourth" value="Log In" />
            </form>
          )}
        </div>
      );
    }
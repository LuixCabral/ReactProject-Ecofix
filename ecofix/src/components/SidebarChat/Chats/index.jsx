import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth"; 
import { StyledChats, StyledRedirect } from "./style";
import app from "../../DatabaseConnection";


export function Chats(){
    
    const auth = getAuth(app);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) =>{
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        console.log(user);
        return () => unsubscribe();
    }, []);

    return(
        <>
         { user? <StyledRedirect/> : <StyledChats/> }
        </>
    )

    


}
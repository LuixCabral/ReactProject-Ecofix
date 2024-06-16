import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth"; 
import { StyledChats, StyledRedirect } from "./style";
import app from "../../DatabaseConnection";
import example from '/src/assets/example.svg'
import { getFirestore, collection, doc, getDocs, addDoc, query, where, Timestamp, serverTimestamp, onSnapshot, QuerySnapshot, updateDoc } from "firebase/firestore";



const auth = getAuth(app);
const db = getFirestore(app);

export function Chats({onChatClick}){

    
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);

    // função que verifica se usuário está logado ou não
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
    // fim da função

    // mostra a lista de chats caso esteja logado
    useEffect(() => {
        if(auth.currentUser){
            getChats(auth.currentUser.email, setChats);
        }
    },[auth.currentUser])


    return(
        <>
         {user? (
         <StyledChats>
           {chats.map((chat) => (
             <div className="chat" key={chat.id} onClick={() => {onChatClick(chat)}}>
             <img src={example} alt="" className="photo" />
             <span className="contactName">{chat.chatName}</span>
            </div>
           ))}     
         </StyledChats>
         ):(
         <StyledRedirect>Faça Login para acessar o chat</StyledRedirect> 
         )}
        </>
    )
}

// funcionalidade que adiciona chat a lista e ao banco de dados
export const addChat = async (user1, user2) => {
 
    const q = query(collection(db, 'chats'), where('participants', 'array-contains', user1))
    const chatSnapshot = await getDocs(q);
    const existingChat = chatSnapshot.docs.find(doc => doc.data().participants.includes(user2));

    if(existingChat){
        const refDoc = doc(db, 'chats', existingChat.id);
        await updateDoc(refDoc, {status: true, hasNewMessage: true});
        return existingChat.id;
    } else {
        const chatDoc = await addDoc(collection(db, 'chats'), {
            participants: [user1, user2],
            lastMessage: '',
            timestamp: serverTimestamp(),
            status: true,
            hasNewMessage: true,
        });
        
        return { id: chatDoc.id};
    }
}
// fim  da funcionalidade


// resgata os chats do usuário
export const getChats = (email, callback) => {
    const q = query(collection(db, 'chats'), where('participants', 'array-contains', email));
    onSnapshot(q, (querySnapshot) => {
        const chats = [];
        querySnapshot.forEach((doc) => {
            const chatName = doc.data().participants.find(participant => participant != email);
            if(chatName){
                chats.push({...doc.data(), id: doc.id, chatName: chatName.split('@')[0]});
            }
            
        });
        callback(chats);    
    });
};



import { useEffect, useState } from "react";
import { StyledMessagesField } from "./style";
import { StyledInput } from "./style";
import { getAuth } from "firebase/auth";
import { collection, doc, where, orderBy, onSnapshot, query, addDoc, updateDoc, getFirestore, serverTimestamp, getDoc, } from "firebase/firestore";
import app from "../../DatabaseConnection";
import { useRef } from "react";
import { StyledChatClosed } from "./style";
import send from '/src/assets/send.svg'
import Avaliacao from "../../../routes/Avaliacao";

const db = getFirestore(app);
const auth = getAuth(app);

export default function PrivateChat({chat, chatClosed, onCloseChat}){

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [avaliado, setAvaliado] = useState(false);
    const [role, setRole] = useState(null);
    const msgEndRef = useRef(null);
    const inputBox = useRef(null);
    const sendButton = useRef(null);

    // altera o estado de visibilidade da caixa de avaliação 
    const toogleAvaliado = () => {
        setAvaliado(!avaliado);
        localStorage.setItem(`avaliado-${chat.id}`, 'true') //armazena o estado de 'avaliado'
    }


    // ao entrar em um chat privado resgata as mensagens e checa se o chat ainda está disponível
    useEffect(() => {
        if(chat){
            getMessages(chat.id, setMessages);
            checkChatStatus(chat.id);
            const isAvaliado = localStorage.getItem(`avaliado-${chat.id}`) === 'true';
            setAvaliado(isAvaliado);
        }   
    }, [chat]);

    // rola tela para baixo ao máximo, até a nova mensagem
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    // adicionando a funcionalidade de enviar mensagem ao pressionar 'Enter'
    useEffect(() => {
        const handleKeyPress = (e) =>{
            if(e.key === 'Enter'){
                sendButton.current.click();
            };
        };

        if(inputBox.current && sendButton.current) {
            inputBox.current.addEventListener('keypress', handleKeyPress);
        };

        return () => {
            if(inputBox.current && sendButton.current){
                inputBox.current.removeEventListener('keypress', handleKeyPress);
            }
                
        };
    }, [])


    // função para rolar tela a baixo
    const scrollToBottom = () => {
        msgEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    // adiciona novas mensagens ao banco de dados
    const addMessage = async (text, chatID, sender) => {
        try{
            setNewMessage('');
            if(!text.trim()){
                return;
            }
            await addDoc(collection(db, 'messages'), {
                text,
                chatID,
                sender,
                timestamp: serverTimestamp(),
            });
            
            const chatDoc = await getDoc(doc(db, 'chats', chatID));
            if(!chatDoc.exists()){
                console.error('Chat não encontrado.');
                return;
            };

                await updateDoc(doc(db, 'chats', chatID), {
                    lastMessage: text,
                    timestamp: serverTimestamp(),
                    hasNewMessage: true,
            });

            
            
            console.log('Mensagem criada com sucesso.')
    
        } catch(error){
            console.error('Erro ao criar mensagem: ', error);
        }
        
    } 
    
    // resgata as mensagens do banco de dados correspondente ao chat selecionado
    const getMessages = (chatID, callback) => {
        const q = query(collection(db, 'messages'), where('chatID', '==', chatID),orderBy('timestamp'));
        onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });
            if(typeof callback === 'function'){
                callback(messages);
            } else {
                console.error('Callback is not a function')
            }
            
        })
    }

    // formatação de data e hora 
    function formatDate(timestamp) {
        const date = new Date(timestamp.seconds * 1000); // Convertendo para milissegundos
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        return date.toLocaleString('pt-BR', options); // Altere 'pt-BR' para o código do idioma desejado
    }

    // função que envia a mensagem 
    const handleSend = async () => {
        if(newMessage.trim()){
            await addMessage(newMessage, chat.id, auth.currentUser.email);
        }
    }

    // função que checa se o chat está disponível ou não
    const checkChatStatus = async(chatID) => {
        try{
            const chatDoc = await getDoc(doc(db, 'chats', chatID));
            if(chatDoc.exists()){
                const status = !chatDoc.data().status;
                if(status !== chatClosed){
                    onCloseChat(status);
                }
            }
        } catch (error) {
            console.error('Erro ao atualizar status: ', error)
        }
    };

        // acessando a role do usuario (especialista ou não)
        useEffect(() => {
            const buscarRole = async () => {
                try {
                    const docUser = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
                    if(docUser.exists()){
                        setRole(docUser.data().role);
                        console.log('Role encontrada.')
                    } else {
                        console.error('Documento não encontrado');
                    }
                } catch (error) {
                    console.error('Erro ao buscar a role do usuário: ', error)
                }
            };

            buscarRole();
        }, [])
     
    return(
        <>
        <StyledMessagesField>
        { Array.isArray(messages) && messages.length > 0 ? messages.map((msg, index) => (
            <div key={index} className="msgBox">
            <span className="userName">{msg.sender && msg.sender.split('@')[0]}</span>
            <span className="msg">{msg.text}</span>
            <span className="time">{ msg.timestamp ? formatDate(msg.timestamp) : ''}</span>
            </div> 
        )) : <p></p>
        }
        <div ref={msgEndRef}/>     
        </StyledMessagesField>
        {chatClosed ? 
        (
            <>
            {!avaliado && role === 'usuario' ? 
                (
                <Avaliacao onClose={toogleAvaliado}/>   
                )
                :
                (
                <StyledChatClosed>
                O chat foi finalizado.
                </StyledChatClosed>
                )
            } 
            </>
        )
        :
        (
        <StyledInput>
            <input type="text" ref={inputBox} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="inputBox" placeholder="Digite uma mensagem..." />
            <button className="send" ref={sendButton} onClick={handleSend}><img src={send} alt="" height='23vh' className="imgSend"/></button>
        </StyledInput>
        )
        
        }
        
        </>
        
    )
}








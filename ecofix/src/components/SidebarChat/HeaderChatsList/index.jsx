import { StyledSidebarHeader } from "./style";
import options from '/src/assets/options.svg';
import example from '/src/assets/example.svg';
import React, { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDocs, getFirestore, collection, query, where, addDoc, doc, setDoc } from 'firebase/firestore';
import app from '../../DatabaseConnection';
import { addChat } from "../ChatsList";
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const db = getFirestore(app);

export default function SidebarHeader({ email }) {
    const [logado, setLogado] = useState(null);
    const [chatAdicionado, setChatAdicionado] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();
    const buttonMenuRef = useRef();
    const optionsImgRef = useRef();

    // Verificação de LogIn
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogado(user);
            } else {
                setLogado(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Função para adicionar chat
    const addChatButton = async () => {
        if (!logado || chatAdicionado) return;

        let emailDigitado = email ? email.email : prompt('Digite o e-mail:');
        if (!emailDigitado) return;

        if (emailDigitado === auth.currentUser.email) {
            alert('Digite um email diferente do seu.');
            return;
        }

        const validacao = emailDigitado.split('@');
        if (validacao.length === 2) {
            try {
                const q = query(collection(db, 'usuarios'), where('email', '==', emailDigitado));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const user2email = userDoc.data().email;

                    // Verifica se o chat já existe antes de adicionar
                    const chatExistente = await checkExistingChat(auth.currentUser.email, user2email);
                    if (chatExistente) {
                        console.log('Chat já existe ou foi excluído. ID: ', chatExistente);
                    } else {
                        const chatID = await createOrRestoreChat(auth.currentUser.email, user2email);
                        
                    }

                    setChatAdicionado(true);  // Marca que o chat foi adicionado
                } else {
                    alert('Usuário não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao adicionar chat: ', error);
            }
        } else {
            alert('Insira um email válido.');
        }
    };

    // Função para verificar se o chat já existe ou foi excluído
    const checkExistingChat = async (email1, email2) => {
        try {
            const q = query(collection(db, 'chats'), where('participants', 'array-contains-any', [email1, email2]));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                for (const doc of querySnapshot.docs) {
                    const chat = doc.data();
                    if (chat.participants.includes(email1) && chat.participants.includes(email2)) {
                        return doc.id;
                    }
                }
            }
            return null;
        } catch (error) {
            console.error('Erro ao verificar chat existente: ', error);
            return null;
        }
    };

    // Função para criar ou restaurar um chat
    const createOrRestoreChat = async (email1, email2) => {
        try {
            const chatID = await addChat(email1, email2);
            // Pode adicionar lógica aqui para restaurar um chat marcado como excluído, se necessário
            return chatID;
        } catch (error) {
            console.error('Erro ao criar ou restaurar chat: ', error);
            return null;
        }
    };

    // Chamada automática para adicionar chat ao montar o componente
    useEffect(() => {
        if (logado && email && !chatAdicionado && email != auth.currentUser.email) {
            addChatButton();
        } 
    }, [logado, email, chatAdicionado]);

    // Função de dropdown para o botão de opções
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                event.target !== buttonMenuRef.current && event.target !== optionsImgRef.current) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleShowDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <StyledSidebarHeader>
            <div className="boxArrowPhoto">
                <a href="/profile">
                    <div className="photo">
                        <img className='svg' src={example} alt="Foto do usuário" />
                    </div>
                </a>
            </div>
            <h1 className="title">CHAT</h1>
            <div className="menu">
                <button onClick={toggleShowDropdown} className="buttonMenu" ref={buttonMenuRef}>
                    <img src={options} alt="opções" width='30px' height='30px' ref={optionsImgRef} />
                </button>
                {showDropdown &&
                    (<nav className="dropdown" ref={dropdownRef}>
                        <ul id='boxLinks' type='none'>
                            <li className="box boxTop">
                                <button className="link" onClick={addChatButton}>Adicionar chat</button>
                            </li>
                            <li className="box boxBottom">
                                <Link to='/news'><button className="link">News Page</button></Link>
                            </li>
                        </ul>
                    </nav>)
                }
            </div>
        </StyledSidebarHeader>
    );
}

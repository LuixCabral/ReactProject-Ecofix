import React from 'react';
import '../../styles/Header.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../../components/DatabaseConnection";
import { getAuth } from "firebase/auth";

import back from "../../assets/back.png";
import menu from "../../assets/menu.png";
import user from "../../assets/user.png";

const Header = () => {
    // Para navegacao
    const navigate = useNavigate();
    const [data, setData] = useState('');
    try {
    auth.currentUser
    }catch (error) {
        navigate('/acesso-negado/');
    }

    // Para o menu mobile 
    const menuOpenIcon = back; 
    const menuCloseIcon = menu;
    const [menuOpen, setMenuOpen] = useState(true);
    const toggleMenu = () => {
        setMenuOpen((open) => !open);
    }

    // Lendo datos do Firebase do usuario
    const db = getFirestore(app)
    const auth = getAuth();
    const [userPhoto, setUserPhoto] = useState(user)
    async function dataHandler(){
        const user = auth.currentUser;
        const docRef = doc(db,"usuarios",user.uid);
        const userInfo = await getDoc(docRef);
  
        if(userInfo.exists()){
          setName(capitalize((userInfo.data().name.split(" ")[0])));
          setData(userInfo.data());
          console.log(data.uid);
        }
        setUserPhoto(userPhoto);   
    }
  
    useEffect(() => {
      dataHandler();
    },[])

    // Para o perfil
    const handleProfileClick = () => {
        //   setShowDropdown(!showDropdown);
        // 
        navigate('/meu-perfil/'); //segue para a pagina 
    }
    // logout do usuario
    const handleLogout = () => {
        auth.signOut();
        navigate('/entrar');
    }

    return(
        <header className='header'>
            <div className="profile-div" onClick={handleProfileClick}>
                <img src={userPhoto} alt=""/>     
            </div>

            <div id='menu-burguer-Div'>
            <button className="menu-button" onClick={toggleMenu}>
                <img className="burguerMenu" src={menuOpen? menuCloseIcon : menuOpenIcon} alt="Menu Toggle" />
            </button>

                
            </div>
            
        </header>
    );
};

export default Header;


import '../../styles/Header.scss';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../../components/DatabaseConnection";
import { getAuth } from "firebase/auth";
import Appointments from '../forms/Appointments';
import back from "../../assets/back.png";
import menu from "../../assets/menu.png";
import user from "../../assets/user.png";
import chatIcon from '../../assets/chat.png'; 

const Header = () => {
    // Para navegacao
    const navigate = useNavigate();
    //const [data, setData] = useState('');
    // try {
    // auth.currentUser
    // }catch (error) {
    //     navigate('/acesso-negado/');
    // }

    


    // Lendo datos do Firebase do usuario
    const db = getFirestore(app)
    const auth = getAuth(app);
    const [userPhoto, setUserPhoto] = useState(user)
    async function dataHandler(){
        const user = auth.currentUser;
        const docRef = doc(db,"usuarios",user.uid);
        const userInfo = await getDoc(docRef);
  
        if(userInfo.exists()){
          //setName(capitalize((userInfo.data().name.split(" ")[0])));
          //setData(userInfo.data());
          if(userInfo.data().photoURL){
              setUserPhoto(userInfo.data().photoURL)
              return;
          }
          setUserPhoto(userPhoto)
          return;
        }
        setUserPhoto(userPhoto);   
    }
  
    useEffect(() => {
      dataHandler();
    },[])

    // Para o perfil
    const handleProfileClick = () => {
      navigate('/meu-perfil/');
      
    }
    // logout do usuario
    const handleLogout = () => {
        auth.signOut();
        navigate('/entrar');
    }

    // Para o menu mobile 
    const menuOpenIcon = back; 
    const menuCloseIcon = menu;
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen((open) => !open);
    }


    // funções de agendamento
    const [appointmentsVisible, setAppointmentsVisible] = useState(false);

    const handleButtonAppointments = () => {
        setAppointmentsVisible(!appointmentsVisible);
      };
    
      const handleCloseAppointments = () => {
        setAppointmentsVisible(!appointmentsVisible);
      };

    return(
        <header className='header'>
            <div className="profile-div" onClick={handleProfileClick}>
                <img style={{cursor:"pointer"}} src={userPhoto} alt=""/>     
            </div>

            <div id='menu-burguer-Div'>
                <button className="menu-button-search" onClick={toggleMenu}>
                    <img className="burguerMenu" src={menuOpen? menuOpenIcon : menuCloseIcon} alt="Menu Toggle" />
                </button>
                {menuOpen && (
                    <div className='menu-div'>
                        <div className="menu-header-div">
                            <h2>Ecofix</h2>
                        </div>
                        
                        <ul className='menu-list-item'>
                            <li onClick={() => navigate('/home')}>
                                <div className="item-link" id="page-link1">
                                    <svg className="link-icon feather feather-heart" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                        <defs />
                                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                        <path d="M9 22V12h6v10" />
                                    </svg>
                                Home
                                </div>
                            </li>

                            <li>
                                <div className="item-link active" id="page-link2">
                                    
                                Especialistas
                                </div>
                            </li>

                            <li>
                                <a className="item-link" id="page-link3" onClick={handleButtonAppointments}>
                                    <svg className="link-icon feather feather-list" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                        <path d="M5 3l14 9-14 9V3z" />
                                    </svg>
                                Agendamento
                                </a>
                            </li>
                            <li style={{cursor:'pointer'}} onClick={handleLogout}>Sair</li>
                                     
                        </ul>
                        {/* botao de chat no menu */}
                        <button className="btn-chat" >
                            <img src={chatIcon}  alt="" width='30' height='30'/>
                        </button>

                    </div>
                )}
            
            </div>
            {appointmentsVisible && (
         <div className="overlay-appoint" onClick={handleCloseAppointments}>
           <Appointments />
       </div>
      )}
        </header>
    );
};

export default Header;

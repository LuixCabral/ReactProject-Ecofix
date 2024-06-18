import "../styles/profile.css";
import "../styles/responsive.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, query, where, getDocs, updateDoc, setDoc } from "firebase/firestore";
import app from '../components/DatabaseConnection';
import { getAuth } from "firebase/auth";
import dbPhoto from "../assets/user.png";
import chat from "../assets/whitechat.png";
import edit from "../assets/editar.png";
import LoadingSpinner from '../components/LoadingSpinner';
import { Sidebar } from './SidebarChat';
import linkedinIcon from "../assets/linkedin.png";
import mail from "../assets/mail.png"
import handleDownload from "./BotaoDownload"
import Appointments from "./forms/Appointments";
// import "./cssBotaoDownload.css"


const Profile = ({ userId, isCurrentUser }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [userPhoto, setUserPhoto] = useState(dbPhoto);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');
  const db = getFirestore(app);
  const [linkedin, setLinkedin] = useState('seu-linkedin');
  const [businessmail, setMailBusiness] = useState('email@exemplo.com');
  const [editMode, setEditMode] = useState(false);
  const [bioText, setBioText] = useState('');
  const [bioInput, setBioInput] = useState('');
  const [location, setLocation] = useState('')
  const [thisUser, setThisUser] = useState('');
  const [similarProfiles, setSimilarProfiles] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false); 
  const [appointmentsVisible, setAppointmentsVisible] = useState(false);
  const [chatEmail, setChatEmail] = useState(null);
  const [expertise, setExpertise] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'usuarios', userId));
        const currentUser = auth.currentUser;
        setThisUser(currentUser.uid);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(userData);
          setName(userData.name);
          setLocation(userData.location);
          setBioText(userData.bio || '');
          setChatEmail(userData.email);
          if (userData.role === 'Specialist') {
            setRole('Especialista');
          }
          if (userData.photoURL) {
            setUserPhoto(userData.photoURL);
          } else {
            setUserPhoto(dbPhoto);
          }
          if (userData.linkedin) {
            setLinkedin(userData.linkedin);
          }
          if (userData.businessmail) {
            setMailBusiness(userData.businessmail);
          }
          if(userData.expertise){
            setExpertise(userData.expertise);
          }
        } else {
          console.log('Usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [db, userId, auth]);
  function capitalize(string){
    return string.replace(string[0],string[0].uppercase);
  }
  useEffect(() => {
    const fetchSimilarProfiles = async () => {
      try {
        if (!thisUser) return;

        const specialistsRef = collection(db, 'usuarios');
        const q = query(specialistsRef, where('role', '==', 'Specialist'));
        const querySnapshot = await getDocs(q);
        const tempProfiles = [];
        const profiles = [];
        querySnapshot.forEach((doc) => {
          tempProfiles.push({ id: doc.id, ...doc.data() });
        });
        for (let i = 0; i < tempProfiles.length; i++) {
          if (tempProfiles[i].uid !== thisUser && tempProfiles[i].uid !== userId) {
            profiles.push(tempProfiles[i]);
          }
        }
        if (profiles.length > 5) {
          setSimilarProfiles(profiles.slice(0, 5));
        } else {
          setSimilarProfiles(profiles);
        }
      } catch (error) {
        console.error('Erro ao buscar perfis similares:', error);
      }
    };

    fetchSimilarProfiles();
  }, [db, thisUser]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <p>Usuário não encontrado</p>;
  }

  const handleEdit = () => {
    if (editMode && bioInput.trim() !== '') {
      saveBio();
    }
    setEditMode(!editMode);
  };


  const handleBioChange = (e) => {
    setBioInput(e.target.value);
  };

  const saveBio = async () => {
    try {
      const userDocRef = doc(db, 'usuarios', userId);
      await updateDoc(userDocRef, { bio: bioInput });
      setBioText(bioInput);
    } catch (error) {
      console.error('Erro ao salvar bio:', error);
    }
  };

  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
  };


  const goToProfile = (e) => {
    if (e.target.className === "userInList") {
      navigate('/user/' + e.target.lastChild.id);
      return;
    }
    navigate('/user/' + e.target.offsetParent.lastChild.id);
  };

  //funções da lógica do chat
  const handleButtonChat = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleButtonAppointments = () => {
    setAppointmentsVisible(!appointmentsVisible);
  };

  const handleCloseAppointments = () => {
    setAppointmentsVisible(!appointmentsVisible);
  }

  return (
    <div className="container">
      {/* ===== Header/Navbar ===== */}
      <header>
        <div className="brandLogo">
          <span style={{fontSize:'x-large'}}>Ecofix</span>
        </div>
      </header>

      {/* ===== User Main-Profile ===== */}
      <section className="userProfile card">
        <div className="profile">
          <figure><img src={userPhoto} alt="profile" width="250px" height="250px" /></figure>
        </div>
        <div className="user-profile-data">
        </div>
      </section>

      {/* ===== Work & Skills Section ===== */}
      <section className="work_skills card">
        {/* ===== Work Container ===== */}
        <div className="work">
          <h1 className="heading">Contatos</h1>
          <div className="primary">
            <a style={{marginBottom:'10px'}} href="#" target="_blank"><img style={{width:'20px', marginRight:'5px'}} src={linkedinIcon} alt="" />{"linkedin.com/in/"+linkedin}</a>
            <p><img style={{width:'20px', marginRight:'5px'}} src={mail} alt="" />{user.email}</p>
          </div>
        </div>

        {/* ===== Skills Container ===== */}
        <div className="skills">
          <h1 className="heading">Especialista em:</h1>
          <ul>
            <li>{expertise}</li>
          </ul>
        </div>
      </section>

      {/* ===== User Details Sections ===== */}
      <section className="userDetails card">
        <div className="userName">
          <h1 className="name">{name}</h1>
          <div className="map">
            <i className="ri-map-pin-fill ri"></i>
            <p>Localização:{location}</p>
          </div>
        </div>

        <div className="btns">
          <ul>
            <li className="sendMsg">
              <i className="ri-chat-4-fill ri"></i>
              <a href="#" onClick={handleButtonChat}>{isCurrentUser ? "Abrir Chat" : "Enviar mensagem"}</a>
            </li>
            {isCurrentUser && (
              <li className="sendMsg active">
                <i className="ri-check-fill ri"></i>
                <a href="/editar-perfil/">Editar Perfil</a>
              </li>
            )}
            {isCurrentUser ?  (
              <li className="sendMsg active">
              <i className="ri-check-fill ri"></i>
              <a onClick={handleButtonAppointments}>Agendamento</a>
            </li>
            ) : <span></span>}
          </ul>
        </div>
      </section>

      {/* ===== Timeline & About Sections ===== */}
      <section className="timeline_about card">
        <div className="tabs">
          <ul>
            <li className="about active">
              <i className="ri-user-3-fill ri"></i>
              <span>Sobre Mim</span>
            </li>
            <img onClick={handleEdit} id="editIcon" style={{width:'30px', marginTop:'-1.5%', marginLeft:'-3%', cursor:'pointer'}} src={edit} alt="Editar" />
          </ul>
          {editMode ? (
            <>
            <button className="btnTextField" onClick={handleEdit}>Salvar</button>
            <textarea 
              style={{textAlign: 'justify'}}
              value={bioInput}
              onChange={handleBioChange}
              autoFocus
            />
            </>
          ) : (
            <p style={{textAlign: 'justify'}}>{bioText}</p>
          )}
        </div>
      </section>
      
      <section className="DownloadFiles">
        <div className="Arquivo">
          <button className="BotaoDownload" onClick={() => handleDownload("testes/teste1.txt", "teste1.txt")}>Download</button>
        </div>
        <div className="Arquivo">
          <button className="BotaoDownload" onClick={() => handleDownload("testes/teste1.txt", "teste1.txt")}>Download</button>
        </div>
        <div className="Arquivo">
          <button className="BotaoDownload" onClick={() => handleDownload("testes/teste1.txt", "teste1.txt")}>Download</button>
        </div>
      </section>



      {/* Lógica da abertura do chat na página de perfil */}
      {sidebarVisible && (
         <div className="sidebar-overlay" onClick={handleCloseSidebar}>
         <div className="sidebar-container" onClick={e => e.stopPropagation()}>
           <Sidebar email={user.email} />
         </div>
       </div>
      )}
      {/* fim da lógica */}

      {appointmentsVisible && (
         <div className="overlay-appoint" onClick={handleCloseAppointments}>
         
           <Appointments />
         
       </div>
      )}

      

    </div>
  );
};

export default Profile;

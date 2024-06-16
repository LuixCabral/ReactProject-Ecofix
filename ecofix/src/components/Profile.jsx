import "../styles/userprofile.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import app from '../components/DatabaseConnection';
import { getAuth } from "firebase/auth";
import dbPhoto from "../assets/user.png";
import chat from "../assets/whitechat.png";
import edit from "../assets/editar.png";
import LoadingSpinner from '../components/LoadingSpinner';

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
  const [thisUser, setThisUser] = useState('');
  const [similarProfiles, setSimilarProfiles] = useState([]);
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
          if (tempProfiles[i].uid !== thisUser && tempProfiles[i].uid !== userId ) {
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
    setEditMode(!editMode);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setEditMode(false);
    }
  };

  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
  };

  const handleMailChange = (e) => {
    setMailBusiness(e.target.value);
  };

  const goToProfile = (e) => {
    if (e.target.className === "userInList") {
      navigate('/user/' + e.target.lastChild.id);
      return;
    }
    navigate('/user/' + e.target.offsetParent.lastChild.id);
  };

  return (
    <>
      <div className="content-profile-page">
        <div className="profile-user-page card">
          <div className="img-user-profile">
            <img className="profile-bgHome" src="https://37.media.tumblr.com/88cbce9265c55a70a753beb0d6ecc2cd/tumblr_n8gxzn78qH1st5lhmo1_1280.jpg" />
            <img className="avatar" src={userPhoto} alt="User" />
          </div>
          <button><img id="chatIMG" src={chat} alt="Enviar Mensagem" /></button>
          <div className="user-profile-data">
            <h1>{name}</h1>
            <p>{linkedin}</p>
            <p>{businessmail}</p>
          </div>
          {isCurrentUser && (
            <button className="edit-profile" onClick={handleEdit}><img src={edit} alt="Editar" />Editar Perfil</button>
          )}
          <div className="description-profile">Front-end | Security Researcher | CSS Warrior | <a href="https://twitter.com/bullgit" title="bullgit"><strong>@bullgit</strong></a> | I love to create small things for the internet!</div>
        </div>
        <div className="similar-profiles">
          <h2>Perfis Similares</h2>
          <ul style={{ listStyleType: 'none' }}>
            {similarProfiles.map((profile, index) => (
              <li onClick={goToProfile} className="userInList" key={index}>{profile.name}<p className="userProfileRole">{profile.role === "Specialist" ? "Especializado em: " : ""}</p><img className="userProfileImage" style={{ width: '30px' }} src={profile.photo === undefined ? dbPhoto : profile.photo} alt="" /><span id={profile.uid}></span></li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;

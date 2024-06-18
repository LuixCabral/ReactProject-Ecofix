import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../components/DatabaseConnection';
import dbPhoto from '../assets/user.png';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/editProfile.css';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [userId, setUserId] = useState(null); // Initialize userId as null
  const [loading, setLoading] = useState(true);
  const [userPhoto, setUserPhoto] = useState(dbPhoto);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name || '');
            setUserPhoto(userData.photoURL || dbPhoto);
            setLocation(userData.location || '');
          } else {
            console.log('Usuário não encontrado');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('Usuário não está logado');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, db, navigate]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setUserPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userRef = doc(db, 'usuarios', userId);
      const updates = { name, location };

      if (photoFile) {
        const photoRef = ref(storage, `userPhotos/${userId}`);
        await uploadBytes(photoRef, photoFile);
        const photoURL = await getDownloadURL(photoRef);
        updates.photoURL = photoURL;
        await updateProfile(auth.currentUser, { photoURL });
      }

      await updateDoc(userRef, updates);

      if (password) {
        const user = auth.currentUser;
        await user.updatePassword(password);
      }

      alert('Perfil atualizado com sucesso');

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setLoading(false);
      navigate('/meu-perfil/');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="edit-profile-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="photo">Foto do Perfil:</label>
          <img src={userPhoto} alt="User Photo" className="user-photo" />
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Cidade:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditProfile;

import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { getAuth } from "firebase/auth";

const MyProfile = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const user = auth.currentUser;
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error("Erro ao recuperar o usuário:", error);
    }
  }, [auth]);

  if (!currentUser) {
    return <p>Carregando...</p>;
  }

  return <Profile userId={currentUser.uid} isCurrentUser={true} />;
};

export default MyProfile;

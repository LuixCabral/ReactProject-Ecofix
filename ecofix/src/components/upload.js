import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import app from "../components/DatabaseConnection";
async function uploadArquivos(file) {
    const auth = getAuth(app);
    const user = auth.currentUser;

  if (!user) {
    console.error('Usuário não autenticado.');
    return;
  }

  const userId = user.uid;
  const storage = getStorage(app);
  const storageRef = ref(storage, `users/${userId}/uploads/${file.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Upload realizado com sucesso!', snapshot);
  } catch (error) {
    console.error('Erro no upload:', error);
  }
}

export default uploadArquivos;


import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./DatabaseConnection";

function uploadArquivos(file) {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'testes/teste1.txt');
    const myFile = new File(["conteúdo do arquivo"], "teste1.txt");

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Upload realizado com sucesso!', snapshot);
    }).catch((error) => {
        console.error('Erro no upload:', error);
    });

}

export default uploadArquivos;

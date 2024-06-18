import { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";

function DownloadFileComponent({ userId, isCurrentUser }) {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const storage = getStorage();
      const listRef = ref(storage, `users/${userId}/uploads`);

      try {
        const res = await listAll(listRef);
        const files = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url, fullPath: itemRef.fullPath };
          })
        );
        setFileList(files);
      } catch (error) {
        console.log('Erro ao buscar arquivos:', error);
      }
    };

    fetchFiles();
  }, [userId]);

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  const handleDelete = async (fullPath) => {
    const storage = getStorage();
    const fileRef = ref(storage, fullPath);

    try {
      await deleteObject(fileRef);
      setFileList((prevFiles) => prevFiles.filter(file => file.fullPath !== fullPath));
      console.log('Arquivo excluído com sucesso.');
    } catch (error) {
      console.log('Erro ao excluir arquivo:', error);
    }
  };

  return (
    <div>
      <h2>Arquivos disponíveis para download:</h2>
      {fileList.length > 0 ? (
        <ul>
          {fileList.map((file, index) => (
            <li key={index}>
              {file.name}
              <button onClick={() => handleDownload(file.url)}>Download</button>
              {isCurrentUser && <button onClick={() => handleDelete(file.fullPath)}>Excluir</button>}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum arquivo encontrado.</p>
      )}
    </div>
  );
}

export default DownloadFileComponent;

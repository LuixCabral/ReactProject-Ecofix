import { useState } from 'react';
import uploadArquivos from './upload';
import upload from "../assets/upload.png"
import { useNavigate } from 'react-router-dom';

function UploadFileComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [state, setState] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadArquivos(selectedFile);
      setState(true);

      
    } else {
      console.log('Nenhum arquivo selecionado.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <img style={{width:'30px', cursor:'pointer'}} src={upload}  onClick={handleUpload}/>
      {state && <p style={{color:"green"}}>Arquivo enviado com sucesso!</p>}
    </div>
  );
}

export default UploadFileComponent;

import '../styles/App.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import handleDownload from '../components/BotaoDownload.js';


export default function App() {
  const navigate = useNavigate();
  function switchPage(){
    navigate('entrar');
  }

  return (
    <>
    <h1>Bem-vindo a ecofix</h1>
    <button onClick={switchPage}>Login</button>
    <button onClick={handleDownload}>Download</button>
    </>
  )
}



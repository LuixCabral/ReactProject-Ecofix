import { useEffect } from 'react';
import '../styles/App.css';

import { useNavigate } from 'react-router-dom';


export default function App() {
  const navigate = useNavigate();
  function switchPage(){
    navigate('/entrar');
  }
  useEffect(() => {
    switchPage();
  })

  return (
    <>
    <h1>Bem-vindo a ecofix</h1>
    <button onClick={switchPage}>Login</button>   
    </>
  )
}



import './App.css';
import { SwitchPage } from './components/SwitchPage.js';


function App() {
  return (
    <>
    <h1>Bem-vindo a ecofix</h1>
    <button onClick={SwitchPage('entrar')}>Login</button>
    </>
  )
}

export default App

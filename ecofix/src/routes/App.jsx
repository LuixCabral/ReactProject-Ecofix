import '../styles/App.css';
import { SwitchPage } from '../components/SwitchPage.js';
import handleDownload from '../components/BotaoDownload.js';


function App() {
  return (
    <>
    <h1>Bem-vindo a ecofix</h1>
    <button onClick={SwitchPage('entrar')}>Login</button>
    <button onClick={handleDownload}>Download</button>
    </>
  )
}

export default App

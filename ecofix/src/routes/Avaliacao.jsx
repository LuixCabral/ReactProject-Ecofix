import { useEffect, useState } from 'react'
import './caixaAvaliacao.css'
import abrircaixa from './abrircaixa'
import fecharCaixa from './fecharcaixa'


function Avaliacao() {
  // Use useEffect para chamar abrircaixa após o componente ser montado
  useEffect(() => {
    abrircaixa();
  }, []); // O array vazio [] significa que este efeito só executa uma vez, após a montagem do componente
  
  const [valor, setValor] = useState(3);

  return (
    <>
      <div className="caixaflutuante" id='caixaflutuante'>
        <h2>Avalie a consulta</h2>
        <input 
          type="range" 
          min="1" 
          max="5" 
          value={valor} 
          onChange={(e) => setValor(e.target.value)} 
          className="slider" 
        />
        <button className='fechar' onClick={()=>fecharCaixa}>fechar</button>
      </div>
    </>
  )
}

export default Avaliacao

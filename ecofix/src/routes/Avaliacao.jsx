import { useEffect, useState } from 'react'
import './caixaAvaliacao.css'
import abrircaixa from './abrircaixa'
import fecharCaixa from './fecharcaixa'


function Avaliacao() {
  // Use useEffect para chamar abrircaixa após o componente ser montado
  useEffect(() => {
    abrircaixa();
  }, []); // O array vazio [] significa que este efeito só executa uma vez, após a montagem do componente
  
  
  return (
    <>
      <div className="caixaflutuante" id='caixaflutuante'>
        <p>Testando</p>
        <button className='fechar' onClick={()=>fecharCaixa}>fechar</button>
      </div>
    </>
  )
}

export default Avaliacao

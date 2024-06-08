import { useState } from 'react'
import './caixaAvaliacao.css'
import abrircaixa from './abrircaixa'
import fecharCaixa from './fecharcaixa'


function Avaliacao() {
  window.onload = abrircaixa
  
  return (
    <>
      <div className="caixaflutuante">
        <p>Testando</p>
        <button className='fechar' onClick={()=>fecharCaixa}>fechar</button>
      </div>
    </>
  )
}

export default Avaliacao

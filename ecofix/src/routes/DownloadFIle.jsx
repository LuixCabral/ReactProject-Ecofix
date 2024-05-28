import { useState } from 'react'
import './App.css'
import handleDownload from './Botao'

function DownloadFile() {  

  return (
    <>
    <div>
      <h3>Download de Arquivos</h3>
      <button id= "botao download" onClick={handleDownload}>Download</button>
    </div>
    </>
  )
}

export default DownloadFile

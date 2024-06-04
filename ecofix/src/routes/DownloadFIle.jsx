import { useState } from 'react'
import './cssBotaoDownload'
import config from './configs'
import handleDownload from './Botao'


function DownloadFile() {  

  return (
    <>
    <div class = "container">
      <h3>Download de Arquivos</h3>
      <div class = "Arquivo">
        <button class ="BotaoDownload" onClick={handleDownload}>Download</button>
      </div>
      <div class = "Arquivo">
        <button class ="BotaoDownload" onClick={handleDownload}>Download</button>
      </div>
      <div class = "Arquivo">
        <button class ="BotaoDownload" onClick={handleDownload}>Download</button>
      </div>
      <div class = "Arquivo">
        <button class ="BotaoDownload" onClick={handleDownload}>Download</button>
      </div>
    </div>
    </>
  )
}

export default DownloadFile
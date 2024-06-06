import { useState } from 'react'
import './cssBotaoDownload'
import handleDownload from './Botao'


function DownloadFile() {  

  return (
    <>
    <div class = "container">
      <div className="Arquivo">
          <button className="BotaoDownload" onClick={() => handleDownload("testes/teste1.txt", "teste1.txt")}>Download</button>
        </div>
        <div className="Arquivo">
          <button className="BotaoDownload" onClick={() => handleDownload("testes/teste1.txt", "teste1.txt")}>Download</button>
        </div>
        <div className="Arquivo">
          <button className="BotaoDownload" onClick={() => handleDownload("testes/teste1.txt", "teste1.txt")}>Download</button>
        </div>
        <div className="Arquivo">
          <button className="BotaoDownload" onClick={() => handleDownload("./testes/teste1.txt", "teste1.txt")}>Download</button>
        </div>
        <div className="upload">
          <input type='files' id='uploadArquivos' onClick={()=>uploadArquivos}>Upload</input>
        </div>
    </div>
    </>
  )
}

export default DownloadFile
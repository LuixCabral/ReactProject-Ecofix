import axios from 'axios';
import fileDownload from 'js-file-download';

function handleDownload(url, filename) {
  axios({
    url: url,
    method: 'GET',
    responseType: 'blob', // Recebe a resposta como um Blob
  })
    .then(response => {
      const contentType = response.headers['content-type']; // Tipo de conteúdo do arquivo
      fileDownload(response.data, filename, contentType); // Faz o download do arquivo
    })
    .catch(error => {
      console.error('Erro ao baixar o arquivo:', error);
    });

  console.log(url);
}

export default handleDownload;

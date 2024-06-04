import axios from "axios";
import fileDownload from 'js-file-download';

function handleDownload(url,filename){
    axios.get(url)
      .then(response => {
        fileDownload(response.data, filename);
      })
      .catch(error => {
        console.error('Erro ao baixar o arquivo:', error);
      });

      console.log(url)
  };

export default handleDownload
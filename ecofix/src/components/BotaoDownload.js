import axios from "axios"
import fileDownload from 'js-file-download'


function handleDownload(url,filename) {
    axios.get(url)
    .then((res =>{fileDownload(res.data,filename)}))
}


export default handleDownload
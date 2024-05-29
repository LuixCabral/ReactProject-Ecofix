import axios from "axios";
import fileDownload from 'js-file-download';
import config from "./configs";


function handleDownload(configs) {
    const {url, filename} = config
    console.log(config.url)
    axios.get(config.url)
    .then((res =>{fileDownload(res.data,filename)}))

}


export default handleDownload
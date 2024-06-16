import { useNavigate } from "react-router-dom"
function Unauthorized(){
    const navigate = useNavigate();
    return(
        <div>
    <button style={{background:'black',color:'white'}} onClick={()=>navigate('/entrar/')}>Voltar</button>
	<img style={{width:'500px'}} src="https://images.plurk.com/5pHVCIyRNMdudWmVrrtQ.png" alt=""/>
	<h1>401 Não autorizado</h1>
	<p>Por favor, faça login antes de acessar esta página</p>
</div>

    )
}
export default Unauthorized;
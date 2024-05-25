import '../styles/LoginPage.css'
export default function LoginPage(){
    return(
        <body>
        <section className="container">
            <div className="login-container">
                <div className="circle circle-one"></div>
                <div className="form-container">
                    <h1 className="opacity">Bem-vindo a ecofix</h1>
                    <form>
                        <input type="text" placeholder="USERNAME" />
                        <input type="password" placeholder="PASSWORD" />
                        <button className="opacity">Entrar</button>
                    </form>
                    <div className="register-forget opacity">
                        <a href="">Cadastrar-se</a>
                        <a href="">Esqueci minha senha</a>
                    </div>
                </div>
            </div>
            <div className="theme-btn-container"></div>
        </section>
    </body>
    )
}
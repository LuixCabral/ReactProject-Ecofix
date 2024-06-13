import "../styles/forgotpass.css"

import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword(){
    const [email, setEmail] = useState("");
    const auth = getAuth();

    async function sendResetPermission() {
        console.log("here");
        try {
            await sendPasswordResetEmail(auth, email);
            console.log("complete");
        } catch (error) {
            const errorc = error.code;
            console.log(errorc);
        }
    }

    const notReloadThePageEvent = async (event) => {
        event.preventDefault();
        await sendResetPermission();
    };

    function updateEmail(event) {
        setEmail(event.target.value);
    }

    return(
        <>
    <div className="form-gap"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <div className="text-center">
                          <h3><i className="fa fa-lock fa-4x"></i></h3>
                          <h2 className="text-center">Esqueceu sua senha?</h2>
                          <p>Você pode redefinir sua senha aqui!.</p>
                          <div className="panel-body">
            
                          <form onSubmit={notReloadThePageEvent} id="register-form" role="form" autoComplete="off" className="form" method="post">

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                    <input id="emailReset" onChange={updateEmail} name="email" placeholder="Digite seu email!" className="form-control" type="email" />
                                </div>
                            </div>
                            <div className="form-group">
                                <button name="recover-submit" className="btn btn-lg btn-primary btn-block" value="Reset Password" type="submit">Redefinir Senha</button>
                            </div>

                            </form>
            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        </div>
        </>
        )
}


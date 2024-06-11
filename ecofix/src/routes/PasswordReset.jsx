import "../styles/passwordReset.css";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function PasswordReset() {
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

    return (
        <>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
            <div className="form-gap"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3><i className="fa fa-lock fa-4x"></i></h3>
                                    <h2 className="text-center">Esqueceu a senha?</h2>
                                    <p className="p-in-the-reset">Você pode redefinir sua senha aqui.</p>
                                    <div className="panel-body">

                                        <form onSubmit={notReloadThePageEvent} id="register-form" role="form" autoComplete="off" className="form" method="post">

                                            <div className="form-group">
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                                    <input id="emailReset" onChange={updateEmail} name="email" placeholder="Digite seu email!" className="form-control" type="email" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input name="recover-submit" className="btn btn-lg btn-primary btn-block" value="Reset Password" type="submit" />
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
    );
}

import { createTransport } from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config({path:'../../.env'});

let transporter = createTransport({
    service:"gmail",
    secure: true,
    auth: {
        user: process.env.VITE_MAIL,
        pass: process.env.VITE_PASS
    }

});

transporter.sendMail({
    from:"ecofix <naorespondaecofix@gmail.com>",
    to:"p.vitordias@outlook.com",
    subject: "Confirme seu email",
    text:"olá confirme seu email",
    html:"<h1>Bem-vindo a ecofix!</h1>\n <a href='www.google.com'>Confirmar email</a>"

    

}).then(message => {
    console.log("mm",message);
}).catch(err => {
    console.log("we: ",err);
})


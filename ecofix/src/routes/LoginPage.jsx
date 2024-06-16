import '../styles/LoginPage.scss';
import cn from "https://cdn.skypack.dev/pin/classnames@v2.3.2-D9cZp00G4gR0MYedQXCH/mode=imports/optimized/classnames.js";
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm'
import { useState } from 'react';

function LoginPage(){
    const [switched, setSwitched] = useState(false);
    return (
        <div className="local-container">
          <div className={cn('demo', { 's--switched': switched })}>
            <div className="demo__inner">
              <div className="demo__forms">
                <div className="demo__form">
                <div className="demo__form-content">
                    <LoginForm/>
                  </div>
                </div>
                <div className="demo__form">
                  <div className="demo__form-content">
                    <RegisterForm/>
                  </div>
                </div>
              </div>
              <div className="demo__switcher">
                <div className="demo__switcher-inner">
                  <div className="demo__switcher-content" >
                    <div className="demo__switcher-text">
                      <div>
                        <h3>Não tem conta?</h3>
                        <p>
                          Cadastre-se e conecte-se a várias comunidades e especialistas em sustentabilidade!
                        </p>
                      </div>
                      <div>
                        <h3>Já tem uma conta?</h3>
                        <p>
                            Insira seus dados
                        </p>
                      </div>
                    </div>
                    <button
                      className="demo__switcher-btn"
                      onClick={() => setSwitched(!switched)}
                    >
                      <span className="animated-border" />
                      <span className="demo__switcher-btn-inner">
                        <span>Cadastrar</span>
                        <span>Entrar</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
export default LoginPage;
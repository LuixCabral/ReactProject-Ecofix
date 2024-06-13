import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './styles/index.css'
import LoginPage from './routes/LoginPage.jsx'
import HomePage from './routes/HomePage.jsx'
import NewsFeedPage from './routes/NewsFeedTest.jsx'
import CardTestPage from './routes/CardTestPage.jsx'; 


//Configuração do "router" para trocar de páginas.
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ChatPage from './routes/ChatPage.jsx'
import VerifyPage from './routes/VerifyPage.jsx'

import ForgotPassword from './routes/ForgotPassword.jsx'
const router = createBrowserRouter([
  {
  //Página inicial.
  path: '/',
  element: <App />
  },

  {
  //Página de login.
  path: 'entrar/',
  element: <LoginPage />
  },

  {
    //feed 
  path: 'home/',
  element: <HomePage />
  },

  {
    // Página de feed de notícias.
    path: 'news/',
    element: <NewsFeedPage />
  },

  {
    // Página do Chat
    path:'home/chat/',
    element: <ChatPage/>

  },

  {
    //email page
    path:'confirmar-email/',
    element: <VerifyPage/>
  },
  //
  {
    // pagina pesquisa teste
    path: 'test/',
    element: <CardTestPage/>
  },
  {
    //pagina de esqueci minha senha
    path: '/esqueci-minha-senha/',
    element: <ForgotPassword/>
  },
]);

//Não excluir comentario abaixo, ele ignora o erro de document undefined na linha 23.(erro falso)
// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

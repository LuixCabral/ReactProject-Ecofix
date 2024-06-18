import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './styles/index.css'
import LoginPage from './routes/LoginPage.jsx'
import HomePage from './routes/HomePage.jsx'
import NewsFeedPage from './routes/NewsFeedTest.jsx'
import CardTestPage from './routes/CardTestPage.jsx'; 
import UserProfile from './routes/UserProfile.jsx'
import MyProfile from './routes/MyProfile.jsx'
//Configuração do "router" para trocar de páginas.
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import VerifyPage from './routes/VerifyPage.jsx'
import Unauthorized from './routes/Unauthorized.jsx'
import EditProfile from './routes/EditProfilePage.jsx'
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
    // email page
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
  {
      //pagina de outro user
    path: 'user/:userId',
    element: <UserProfile />
  },
  {
    //pagina de perfil de usuario
    path: 'meu-perfil/',
    element: <MyProfile/>
  },
  {
    //Pagia de acesso não autorizado
    path: 'acesso-negado/',
    element: <Unauthorized/>
  },
  {
    //Pagina de edição de perfil
    path: '/editar-perfil/',
    element: <EditProfile/>
  },
]);

//Não excluir comentario abaixo, ele ignora o erro de document undefined na linha 23.(erro falso)
// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

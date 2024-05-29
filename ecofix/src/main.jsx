import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './styles/index.css'
import LoginPage from './routes/LoginPage.jsx'
import { Component2 } from './Component2/Card'
import CardTestPage from './routes/CardTestPage.jsx';

//Configuração do "router" para trocar de páginas.
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { element } from 'prop-types'
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
    // pagina pesquisa teste
    path: 'test/',
    element: <Card/>
  },
]);
//Não excluir comentario abaixo, ele ignora o erro de document undefined na linha 23.(erro falso)
// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

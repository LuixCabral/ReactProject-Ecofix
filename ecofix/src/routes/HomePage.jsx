import "../styles/home.scss";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import back from "../assets/back.png";
import menu from "../assets/menu.png";
import user from "../assets/user.png";

import { useState, useEffect } from "react";

import app from "../components/DatabaseConnection";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import chatIcon from '/src/assets/chat.png'; 

import { Sidebar } from "../components/SidebarChat";
import Appointments from "../components/forms/Appointments";
// import Swiper JS
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Footer from "../components/footer/Footer";
import { getStorage } from "firebase/storage";


function HomePage(){
  const [userPhoto, setUserPhoto] = useState(user)
  const [name, setName] = useState("null");  // ainda nao em uso
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [appointmentsVisible, setAppointmentsVisible] = useState(false);
  const auth = getAuth();

  const menuOpenIcon = back;
  const menuCloseIcon = menu;

  const navigate = useNavigate();
  const [data, setData] = useState('');
  try {
    auth.currentUser
  } catch (error) {
    navigate('/acesso-negado/');
  }
  

  function capitalize(string){
    const upperCase = string[0].toUpperCase();
    let newString = "";
    for (let index = 1; index < string.length; index++) {
      newString += string[index];
      
    }
    return upperCase + newString;
  }

  async function dataHandler(){
      const db = getFirestore(app)
      const user = auth.currentUser;
      const docRef = doc(db,"usuarios",user.uid);
      const userInfo = await getDoc(docRef);
  
      if(userInfo.exists()){
        setName(capitalize((userInfo.data().name.split(" ")[0])));
        setData(userInfo.data());
        setUserPhoto(userInfo.data().photoURL)
        return;
      }
      setUserPhoto(userPhoto);   
  }

  useEffect(() => {
    dataHandler();
  },[])

  function switchMenuBack(event){
    console.log()
    if (event.target.src.includes(back)){
      event.target.src = menu;
      return;
      }
    event.target.src = back;
  }

  const handleProfileClick = () => {
  //   setShowDropdown(!showDropdown);
  // 
  navigate('/meu-perfil/');
  }
  
  const handleLogout = () => {
 
    auth.signOut();
    navigate('/entrar');
  }

  const handleChatButton = () => {
    setSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
  };

  const handleButtonAppointments = () => {
    setAppointmentsVisible(!appointmentsVisible);
  };

  const handleCloseAppointments = () => {
    setAppointmentsVisible(!appointmentsVisible);
  };

  // toggle funciona a partir de um tamanho de tela
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (windowWidth < 900) {
      setMenuOpen((open) => !open);
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Atualiza a largura da janela quando o tamanho da tela mudar
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Função para verificar se a largura da tela é maior que 900px
  const isDesktop = windowWidth > 900;
  const handleNavigateToEspecialistas = () => {
    navigate('/test'); // Navega para a rota '/especialistas' quando clicado
  };


    return(
<div>
  
  <div className={`app-wrapper ${sidebarVisible ? "blur-background" : ""}`}>
  
    { (menuOpen && windowWidth < 900) || (

    <div className={`left-area ${windowWidth >= 900? 'hide-on-mobile' : ''}`}>

        <div className="left-area-content">
          <div className="app-header">
            <h2>Ecofix</h2>
          </div>
          <div className="page-link-list">
            <ul>
              <li>
                <a href="#" className="item-link active" id="pageLink">
                  <svg className="link-icon feather feather-heart" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <defs />
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                  Home
                </a>
              </li>

              <li>
                {/* Substitui o link <a> pelo componente <div> com onClick para navegação */}
                <div className="item-link" id="pageLink2" onClick={handleNavigateToEspecialistas}>
                  <svg
                    className="link-icon"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23adadad' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-search'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E%0A")`,
                    }}
                  />
                  Especialistas
                </div>
              </li>

              <li>
                <a className="item-link" id="pageLink" onClick={handleButtonAppointments}>
                  <svg className="link-icon feather feather-list" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                  Agendamento
                </a>
              </li>
              {/* adiconar mais funcoes se necessario */}

            </ul>
          </div>

          {/* botao de chat no menu */}
          <button className="btn-chat" onClick={handleChatButton}>
            <img src={chatIcon} alt="" width='30' height='30'/>
          </button>
        </div>
      </div>
    )}

    {/* div do container total da direita */}

    <div className="right-area">

    {/* <p onClick={() => navigate('/meu-perfil/')}> Meu Perfil </p>
    <p onClick={handleLogout}> Sair </p> */}
    <div className="right-area-upper">
      {/* botao burguer menu mobile */}

      <button className="menu-button" onClick={toggleMenu}>
        <img className="burguerMenu" src={menuOpen? menuCloseIcon : menuOpenIcon} alt="Menu Toggle" />
      </button>
      
      {/* <div className="search-part-wrapper">
        <input className="search-input" type="text" placeholder="Encontre especialistas..."/>
      </div> */}
      
      {/* <button className="btn-chat-right" onClick={handleChatButton} >
          <img src={chatIcon} alt="" width='30' height='30'/>
      </button> */}

      <div className="profile" onClick={handleProfileClick}>
        <img src={userPhoto} alt=""/>
        {/* {showDropdown && <ProfileDropdown handleLogout={handleLogout} user={data.uid} />} */}

      </div>
      
    </div>
    
    {/* container total do conteudo de noticias  */}

    <div className="page-right-content">

      {/* slider de noticias */}
      <div className="SliderDiv">

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true, // desabilita o auto slider quando interagir
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper">

          <SwiperSlide>
            <img className="imagem-slider" src="src/assets/arvore-solar.jpg" alt="foto de arvore solar por IA"/>
            <div className="middle-slider">
              <div className="title-slider"> <h2> Arvores solares podem ser a solucao para gerar energia? </h2> </div>
              <div className="news-content"> <p> Ja pensou em uma arvore solar que produz energia de maneira sustentavel? Ela existe e foi criada por pesquisadores brasileiros... </p> </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <img className="imagem-slider" src="src/assets/fazenda-solar.jpg" alt="foto de fazenda solar"/> 

            <div className="middle-slider">

            <div className="title-slider"> <h2> A maior fazenda solar do mundo entra em ação </h2> </div>
            <div className="news-content"> <p> Na China, maior fazenda solar ja esta em operação... </p> </div>

            </div>
          </SwiperSlide>

          {/* adicionar mais noticias se necessario */}
        
        
        </Swiper>

      </div>

      {/* Container total do conteudo secundario de noticias */}

      <div className="content-line">
        
        {/* titulo header  */}

        <div className="line-header">
          <span className="header-text"> <h1> Ultimas Noticias </h1> </span>
        </div>
        
        {/* container total dos containers de container */}

        <div className="owl-carousel">
          
          {/* container das noticias individual */}

          {/* item 1 */}

          <a href="/news/1" className="item-noticia">
            <div>
              <img src="src/assets/energia-geotermica.jpg" alt="foto"/>
              {/* descricao */}
              <div className="noticia-description-div">
                <h3 className="noticia-description-header">Energia geotérmica</h3>
                <p className="noticia-description-subheader"> Google utiliza energia geotermica para alimentar data centers...</p>
              </div>
            </div>
          </a>


          {/* item 2 */}

          <a href="/news/1" className="item-noticia">
            <div>
              <img src="src/assets/energia-agua.jpg" alt="foto"/>
              {/*  Descricao */}
              <div className="noticia-description-div">
                <h3 className="noticia-description-header">Usina hidrelétrica de Itaipu</h3>
                <p className="noticia-description-subheader"> Brasil possui a maior hidrelétrica em geração de energiia do mundo...</p>
              </div>
            </div>
          </a>


          {/* item 3 */}
            <a href="/news/1" className="item-noticia">
              <div>
                <img src="src/assets/cidade-brasileira.jpg" alt="foto"/>
                {/* descricao */}
                <div className="noticia-description-div">
                  <h3 className="noticia-description-header"> Brasil lidera transição energética no mundo </h3>
                  <p className="noticia-description-subheader"> Com 88% da matriz eletrica limpa, Brasil já é lider no mundo... </p>
                </div>
              </div>
            </a>


            {/* item 4 */}
            <a href="/news/1" className="item-noticia">
              <div>
                <img src="src/assets/energia-eolica.jpg" alt="video"/>
                {/* descricao */}
                <div className="noticia-description-div">
                  <h3 className="noticia-description-header">Dia mundial do vento</h3>
                  <p className="noticia-description-subheader">15 de junho: Dia mundial do vento. Revisamos as cinco vantagens da energia eolica...</p>
                </div>
              </div>
            </a>

          </div>
        </div>
      </div>
    </div>
  
    </div>

      {sidebarVisible && (
         <div className="sidebar-overlay" onClick={handleCloseSidebar}>
         <div className="sidebar-container" onClick={e => e.stopPropagation()}>
           <Sidebar closeSidebar={handleCloseSidebar}/>
         </div>
       </div>
      )}

      {appointmentsVisible && (
         <div className="overlay-appoint" onClick={handleCloseAppointments}>
           <Appointments />
       </div>
      )}
      <Footer/>
      
    </div>
  )
}
export default  HomePage;


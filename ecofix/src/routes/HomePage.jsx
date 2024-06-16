import "../styles/home.scss";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import back from "../assets/back.png";
import menu from "../assets/menu.png";
import user from "../assets/user.png"

import { useState, useEffect } from "react";

import app from "../components/DatabaseConnection";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import chatIcon from '/src/assets/chatIcon.svg'; 

import { Sidebar } from "../components/SidebarChat";

// import Swiper JS
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';


export default function HomePage(){
  const [userPhoto, setUserPhoto] = useState(user)
  const [name, setName] = useState("null");  // ainda nao em uso
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const auth = getAuth();
  const db = getFirestore(app)
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenIcon = menu;
  const menuCloseIcon = back;
  const navigate = useNavigate();
  try {
    auth.currentUser
  } catch (error) {
    navigate('/acesso-negado/');
  }

  // toggle menu 
  const toggleMenu =() => {
    setMenuOpen((open) => !open);
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
      const user = auth.currentUser;
      const docRef = doc(db,"usuarios",user.uid);
      const userInfo = await getDoc(docRef);

      if(userInfo.exists()){
        setName(capitalize((userInfo.data().name.split(" ")[0])));
        setData(userInfo.data());
        console.log(data.uid);
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
    setShowDropdown(!showDropdown);
  }
  const handleLogout = () => {
 
    auth.signOut();
    navigate('/entrar');
  }

  const handleChatButton = () => {
    setSidebarVisible(true);
  }

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
  }

    return(
<div>
  <div className={`app-wrapper ${sidebarVisible ? "blur-background" : ""}`}>

  <div className="left-area hide-on-mobile">

    <div className="app-header">
      <h2>Ecofix</h2>
    </div>


    <div className="left-area-content">

      <div className="page-link-list">
        <a href="#" className="item-link active" id="pageLink">
          <svg className="link-icon feather feather-heart" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  viewBox="0 0 24 24">
            <defs />
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <path d="M9 22V12h6v10" /></svg>
          Home</a>
        <a href="#" className="item-link feather feather-heart" id="pageLink">
          <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          Favourites</a>
        <a href="#" className="item-link" id="pageLink">
          <svg className="link-icon feather feather-list" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
          My Contents</a>
        <a href="#" className="item-link feather feather-list" id="pageLink">
          <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
          Playlist </a>
      </div>

      {/* botao de chat no menu da esquerda em telas grandes */}

      <button className="btn-chat" onClick={handleChatButton}> 
        <img src={chatIcon} alt="" width='30' height='30'/>
      </button>

    </div>
  </div>

  {/* div do container da direita */}

  <div className="right-area">
    <p onClick={() => navigate('/meu-perfil/')}> Meu Perfil </p>
    <p onClick={handleLogout}> Sair </p>
    <div className="right-area-upper">
      
      {/* botao menu mobile */}
      <button className="menu-button" onClick={toggleMenu}>
        <img className="burguerMenu" src={menuOpen? menuCloseIcon : menuOpenIcon} alt="Menu Toggle" />
      </button>

      {menuOpen && (

        <div className="left-area-menu">
          <button className="menu-button" onClick={toggleMenu}>
            <img className="burguerMenu" src={menuOpen? menuCloseIcon : menuOpenIcon} alt="Menu Toggle" />
          </button>
          <ul className="lista-menu-mobile">
            <li> <a href="#"> home </a> </li>
            <li> <a href="#"> Buscar Especialistas </a> </li>
          </ul>
        </div>

      )}
      
      <div className="search-part-wrapper">
        <input className="search-input" type="text" placeholder="Encontre especialistas..."/>
      </div>
      
      <button className="btn-chat-right" onClick={handleChatButton} >
          <img src={chatIcon} alt="" width='30' height='30'/>
      </button>

      <div className="profile" onClick={handleProfileClick}>
        <img src={userPhoto} alt=""/>
        {/* {showDropdown && <ProfileDropdown handleLogout={handleLogout} user={data.uid} />} */}

      </div>
      
    </div>
    
    {/* conteudo principal da direita */}

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
          <img className="imagem-slider" src="https://images.unsplash.com/photo-1532673492-1b3cdb05d51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80" alt="video"/>
          <div className="middle-slider">
            <div className="title-slider"> <h2> titulo noticias </h2> </div>
            <div className="news-content"> <p> conteudo da noticia </p> </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <img className="imagem-slider" src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2249&q=80"/> 

          <div className="middle-slider">

          <div className="title-slider"> <h2> titulo noticias </h2> </div>
          <div className="news-content"> <p> conteudo da noticia </p> </div>

          </div>
        </SwiperSlide>
      
      
      </Swiper>

    </div>

    {/* Container do conteudo secundario de noticias */}

    <div className="content-line">
      
      {/* titulo header  */}

      <div className="line-header">
        <span className="header-text"> <h1> Ultimas Noticias </h1> </span>
      </div>
      
      {/* conteudo de noticias container */}

      <div className="owl-carousel">
        
        {/* container das noticias individual */}

        {/* item 1 */}

        <div className="item-noticia">

          <img src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=2168&q=80" alt="video"/>

          {/* descricao */}

          <div className="noticia-description-div">

              <h2 className="noticia-description-header">Minimal Photography</h2>
              <p className="noticia-description-subheader">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa accusamus iste velit quae enim voluptate eaque ipsam porro optio cumque, in dolorum, non aperiam ullam, nihil consectetur iusto vitae blanditiis.</p>
          </div>

        </div>

        {/* item 2 */}

        <div className="item-noticia">

          <img src="https://images.unsplash.com/photo-1531736275454-adc48d079ce9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="video"/>

          {/*  Descricao */}
          <div className="noticia-description-div">

              <h3 className="noticia-description-header">Puppet Theatre</h3>
              <p className="noticia-description-subheader">By July</p>

          </div>

        </div>

        {/* item 3 */}

        <div className="item-noticia">

          <img src="https://images.unsplash.com/photo-1490535004195-099bc723fa1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3280&q=80" alt="video"/>

          {/* descricao */}

          <div className="noticia-description-div">

              <h3 className="noticia-description-header">Road Trip</h3>
              <p className="noticia-description-subheader">By Wallace</p>

          </div>

        </div>

          {/* item 4 */}

          <div className="item-noticia">

            <img src="https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80" alt="video"/>

            {/* descricao */}

            <div className="noticia-description-div">

              <h3 className="noticia-description-header">Young Folks</h3>
              <p className="noticia-description-subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione reprehenderit molestias error corrupti necessitatibus odio magni nihil rerum dicta nulla? Illo quaerat quo ipsum unde dolore? Eveniet incidunt voluptatum repudiandae.</p>

            </div>

          </div>
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

      
  </div>
)
}
import "../styles/home.scss";

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

      }
      setUserPhoto(userPhoto);   
  }

  useEffect(() => {
    dataHandler();
  })

  function switchMenuBack(event){
    console.log()
    if (event.target.src.includes(back)){
      event.target.src = menu;
      return;
      }
    event.target.src = back;
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

    <div className="app-header">Ecofix

      <img className="burguerMenu" src={back} onClick={switchMenuBack} />

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
          Playlist</a>
        <a href="#" className="item-link" id="pageLink">
          <svg className="link-icon feather feather-clock" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" /></svg>
          History</a>
      </div>

      <div className="list-header">
        <span className="">Private</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" /></svg>
      </div>

      <a href="#" className="item-link" id="pageLink">
        <svg className="link-icon feather feather-folder" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        Studio Records</a>

      <a href="#" className="item-link " id="pageLink">
        <svg className="link-icon feather feather-folder" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        Personal</a>

      <div className="list-header">
        <span className="">Public</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" /></svg>
      </div>

      <a href="#" className="item-link" id="pageLink">
        <svg className="link-icon feather feather-folder" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
        Vlogs</a>

      <a href="#" className="item-link feather feather-folder" id="pageLink">
        <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
        Dance</a>

    </div>
    <button className="btn-invite">Invite Team</button>
  </div>

  {/* div do container da direita */}

  <div className="right-area">

    <div className="right-area-upper">

      <button className="menu-button">
        <svg width="24" height="24" fill="none" stroke="#51a380" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <defs />
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
      
      <div className="search-part-wrapper">
        <input className="search-input" type="text" placeholder="Encontre especialistas..."/>
      </div>
      
      <button className="btn-chat" onClick={handleChatButton} >
          <img src={chatIcon} alt="" width='30' height='30'/>
      </button>

      <div className="profile">
        <img src={userPhoto} alt=""/>

        <div className="profile-info">
          {/* aqui quando clicar no perfil aparece outra aba menor com info do perfil */}
       
        </div>

      </div>
      
    </div>
    
    {/* conteudo principal da direita */}

    <div className="page-right-content">

    {/* slider de noticias */}
    <div className="SliderDiv">

      <div className="slider-header">
        <span className="header-text-slider">New Uploads</span>
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true, // desabilita o auto slider
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
            <div className="title-slider"> titulo da noticia</div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <img className="imagem-slider" src="https://images.unsplash.com/photo-1532673492-1b3cdb05d51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80" alt="video"/> 
          
          <div className="middle-slider">
            <div className="title-slider"> titulo da noticia</div>
          </div>
        </SwiperSlide>
      
      
      </Swiper>

    </div>


    <div className="content-line content-line-list">

      <div className="line-header">
        <span className="header-text">Trending</span>
      </div>

      <div id="owl-slider-2" className="slider-wrapper owl-carousel">

        <div className="item video-box-wrapper">

          <div className="img-preview">
              <img src="https://images.unsplash.com/photo-1532673492-1b3cdb05d51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80" alt="video"/>
          </div>

          <div className="video-description-wrapper">
              <p className="video-description-header">Minimal Photography</p>
              <p className="video-description-subheader">By July</p>
              <p className="video-description-info">116K views <span>1 hour ago</span></p>
              <button className="btn-play"></button>
          </div>

        </div>

        <div className="item video-box-wrapper">

          <div className="img-preview">
              <img src="https://images.unsplash.com/photo-1531736275454-adc48d079ce9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="video"/>
          </div>

          <div className="video-description-wrapper">
              <p className="video-description-header">Puppet Theatre</p>
              <p className="video-description-subheader">By July</p>
              <p className="video-description-info">116K views <span>1 hour ago</span></p>
              <button className="btn-play"></button>
          </div>

        </div>

          

        <div className="item video-box-wrapper">

          <div className="img-preview">
              <img src="https://images.unsplash.com/photo-1555298472-8c43a95ddb8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="video"/>
          </div>

          <div className="video-description-wrapper">
              <p className="video-description-header">Road Trip</p>
              <p className="video-description-subheader">By Wallace</p>
              <p className="video-description-info">116K views <span>1 hour ago</span></p>
              <button className="btn-play"></button>
          </div>

        </div>

          <div className="item video-box-wrapper">

            <div className="img-preview">
              <img src="https://images.unsplash.com/photo-1459664018906-085c36f472af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="video"/>
            </div>

            <div className="video-description-wrapper">
              <p className="video-description-header">Young Folks</p>
              <p className="video-description-subheader">By Peter</p>
              <p className="video-description-info">116K views <span>1 hour ago</span></p>
              <button className="btn-play"></button>
            </div>

          </div>
        </div>
      </div>

      <div className="content-line content-line-list">

        <div className="line-header">
          <span className="header-text">Public</span>
        </div>

        <div id="owl-slider-3" className="slider-wrapper owl-carousel">

          <div className="item video-box-wrapper">

            <div className="img-preview">
              <img src="https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80" alt="video"/>
            </div>

            <div className="video-description-wrapper">
              <p className="video-description-header">Minimal Photography</p>
              <p className="video-description-subheader">By July</p>
              <p className="video-description-info">116K views <span>1 hour ago</span></p>
              <button className="btn-play"></button>
            </div>

          </div>

          <div className="item video-box-wrapper">

            <div className="img-preview">
              <img src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=2168&q=80" alt="video"/>
            </div>

            <div className="video-description-wrapper">
              <p className="video-description-header">Road Trip</p>
              <p className="video-description-subheader">By Wallace</p>
              <p className="video-description-info">116K views <span>1 hour ago</span></p>
              <button className="btn-play"></button>
            </div>

          </div>

          <div className="item video-box-wrapper">

            <div className="img-preview">
              <img src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2249&q=80" alt="video"/>
            </div>

            <div className="video-description-wrapper">
              <p className="video-description-header">Young Folks</p>
              <p className="video-description-subheader">By Peter</p>
              <p className="video-description-info">116K views <span>1 hour ago</span></p>
              <button className="btn-play"></button>
            </div>

          </div>

          <div className="item video-box-wrapper">

            <div className="img-preview">
              <img src="https://images.unsplash.com/photo-1490535004195-099bc723fa1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3280&q=80" alt="video"/>
            </div>

            <div className="video-description-wrapper">
              <p className="video-description-header">Minimal Photography</p>
              <p className="video-description-subheader">By July</p>
              <p className="video-description-info">116K views <span>1 hour ago</span></p>
              <button className="btn-play"></button>
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
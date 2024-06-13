import "../styles/home.scss";
import { getAuth } from "firebase/auth";
import back from "../assets/back.png";
import menu from "../assets/menu.png";
import user from "../assets/user.png"
import { useState, useEffect } from "react";
import app from "../components/DatabaseConnection";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import chatIcon from '/src/assets/chatIcon.svg';
import { Link } from "react-router-dom";






export default function HomePage(){
  const [userPhoto, setUserPhoto] = useState(user)
  const [name, setName] = useState("null")
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

    return(
<div className="app-wrapper">
      
  <div className="right-area">
    <div className="right-area-upper">
      <button className="menu-button">
        <svg width="24" height="24" fill="none" stroke="#51a380" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <defs />
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
      <div className="search-part-wrapper">
        <input className="search-input" type="text" placeholder="Procurar especialistas..."/>
        <button className="more-button">
          <svg width="24" height="24" fill="none" stroke="#51a380" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-more-vertical">
            <defs />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
        <ul className="more-menu-list hide">
          <li><a href="#">Explore</a></li>
          <li><a href="#">Events</a></li>
        </ul>
      </div>
      
      <button className="btn-chat" >
      <Link to='chat/'>
        <img src={chatIcon} alt="" width='30' height='30' />
      </Link>
      </button>
      <div className="profile">
        <img src={userPhoto} alt=""/>
        <div className="profile-info">
          <span className="profile-name">{name}</span>
          <span className="country">Country</span>
        </div>
      </div>
      
      <div className="action-buttons-wrapper">

      </div>
    </div>
    <div className="page-right-content">
      <div className="content-line content-line-hero">
        <div className="line-header">
          <span className="header-text">New Uploads</span>
        </div>
        <div className="slider-wrapper owl-carousel owl-theme" id="owl-slider-1">
          <div className="item hero-img-wrapper img-1">
            <div className="upload-text-wrapper">
              <p className="upload-text-header">The </p>
              <p className="upload-text-info">By Pravin <span> 20 minutes ago</span></p>
            </div>
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2240&q=80" alt="SlideShow"/>
          </div>
          <div className="item hero-img-wrapper img-2">
            <div className="upload-text-wrapper">
              <p className="upload-text-header">History of Art</p>
              <p className="upload-text-info">By Pravin <span> 10 minutes ago</span></p>
            </div>
            <img src="https://images.unsplash.com/photo-1485518994577-6cd6324ade8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2144&q=80" alt="SlideShow"/>
          </div>
          <div className="item hero-img-wrapper img-3">
            <div className="upload-text-wrapper">
              <p className="upload-text-header">Van Life</p>
              <p className="upload-text-info">By Tess <span> 3 days ago</span></p>
            </div>
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2208&q=80" alt="SlideShow"/>
          </div>
        </div>
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
              <img src="https://images.unsplash.com/photo-1562832275-4b5d7650c888?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="video"/>
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
              <img src="https://images.unsplash.com/photo-1523554888454-84137e72c3ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="video"/>
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
              <img src="https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="video"/>
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
              <img src="https://images.unsplash.com/photo-1518272417499-b6ebd5fab96a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2181&q=80" alt="video"/>
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
              <img src="https://images.unsplash.com/photo-1524678714210-9917a6c619c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2249&q=80" alt="video"/>
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
          <div className="item video-box-wrapper">
            <div className="img-preview">
              <img src="https://images.unsplash.com/photo-1522410818928-5522dacd5066?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="video"/>
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
              <img src="https://images.unsplash.com/photo-1544509099-047faa4b96ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80" alt="video"/>
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
              <img src="https://images.unsplash.com/photo-1533157461-59f499ba82e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80" alt="video"/>
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
    </div>
  </div>
  </div>
  )
  }
// src/routes/NewsFeedPage.jsx

import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import NewsFeed from '../components/newsfeed/NewsFeed';
import '../styles/newspage.css'

function NewsFeedPage() {
    return (
        <div className="NewsFeedPage">
            <Header />
         
            <NewsFeed />
            
            <Footer />
        </div>
    );
};

export default NewsFeedPage;
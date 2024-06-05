// src/routes/NewsFeedPage.jsx

import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import NewsFeed from '../components/newsfeed/NewsFeed';

function NewsFeedPage() {
    return (
        <div className="NewsFeedPage">
            <Header />
            <main className="main-content">
                <NewsFeed />
            </main>
            <Footer />
        </div>
    );
};

export default NewsFeedPage;
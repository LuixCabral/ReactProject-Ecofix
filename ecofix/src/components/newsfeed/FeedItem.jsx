// src/components/newsfeed/FeedItem.js
import React from 'react';
import '../../styles/FeedItem.css';

const FeedItem = ({title, description}) => {
    return (
        <div className='news-items'>
            <h2> {title} </h2>
        </div>
    );
};

export default FeedItem;
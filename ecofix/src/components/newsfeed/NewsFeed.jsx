import React from "react";
import FeedItem from "./FeedItem";
import '../../styles/NewsFeed.css'

const NewsFeed = () => {
    const news = [
        { id: 1, title: 'News Title 1', description: 'Descricao da noticia 1' },
        { id: 2, title: 'News Title 2', description: 'Descricao da noticia 2' },
        { id: 3, title: 'News Title 3', description: 'Descricao da noticia 3' }
    ];

    return (
        <div className="news-feed">
            {news.map((item) => (
                <FeedItem key={item.id} title={item.title} description={item.description} />
            ))}
        </div>
    );
};

export default NewsFeed;
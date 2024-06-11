import React from "react";
import FeedItem from "./FeedItem";
import '../../styles/NewsFeed.css'

const NewsFeed = () => {
    const news = [
        { id: 1, title: 'News Title 1', description: 'Descricao da noticia 1' },
        
        { id: 2, title: 'News Title 2', description: 'Descricao da noticia 2' },

        { id: 3, title: 'titulo da notica', description: 'Descricao da noticia 3' },

        { id: 4, title: 'titulo da notica', description: 'Descricao da noticia 4' },

        { id: 5, title: 'titulo da notica', description: 'Descricao da noticia 5' },

        { id: 6, title: 'titulo da notica', description: 'Descricao da noticia 6' }
    ];

    return (
        <div className="news-feed">
            {news.map((item) => (
                <FeedItem key={item.id} title={item.title} description={item.description}/>
            ))}
        </div>
    );
};

export default NewsFeed;
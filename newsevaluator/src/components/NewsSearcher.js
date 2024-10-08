import React, { useState } from 'react';
import axios from 'axios';
import './newssearcher.scss';
import Card from './Card';


const NewsSearcher = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsArticles, setNewsArticles] = useState([]);
  const [visible, setVisible] = useState(10); // initially show 8 articles
  const[showresult,setshowresult]=useState(false);

const loadMore = () => {
  setVisible((prevValue) => prevValue + 5); // load 4 more articles
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/search?q=${encodeURIComponent(searchTerm)}`, {
        withCredentials: false,
        "Access-Control-Allow-Origin": "*"

      });
      setNewsArticles(response.data.articles);
      setshowresult(true);
    } catch (error) {
      console.error('Error fetching news articles:', error);
    }
  };

  return (
    <>
    <div className="news-searcher">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for news articles..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {
        showresult && newsArticles.length === 0 && <h2>No articles found</h2>
      }
      {
        showresult && <button className="clear-button" onClick={() =>{setshowresult(false);
          setNewsArticles([]);
          setSearchTerm('');
        }}>Clear</button>
      }
      <div className="card-container">
        {newsArticles.slice(0,visible).map((article,index) => (
          <Card
            key={index}
            title={article.title}
            description={article.description}
            url={article.url}
            image={article.urlToImage}
            date={article.publishedAt}
          />
        ))}
        
      </div>
      {visible < newsArticles.length && 
      <button onClick={loadMore} className="load-more">Load More</button>
    }
    </div>
    
    </>
  );
};

export default NewsSearcher;
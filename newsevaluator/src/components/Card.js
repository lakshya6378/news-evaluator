import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';

const Card = ({ title, url, description, image,date }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className='card-date'>{date.split('T')[0]}</p>
        <p className="card-description scrollable">{description}</p>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="card-link">
          Read more
        </a>
    </div>
  );
};

Card.propTypes={
    title:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    url:PropTypes.string.isRequired,
    image:PropTypes.string.isRequired,
    date:PropTypes.string.isRequired

}

export default Card;
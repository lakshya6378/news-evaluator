import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcSpeaker} from 'react-icons/fc';
import {AiFillCloseCircle} from 'react-icons/ai';
import './Dictionary.scss';
import PropTypes from 'prop-types';

function Dictionary({ data }) {
  const [text, setText] = useState('');
  //const [hoveredWord, setHoveredWord] = useState('');
  const [description, setDescription] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    setText(data);
  }, [data]);

  const fetchMeaning = async (word) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description`, { params: { word: word } });
      return response.data[0]; // Assuming the API response provides the definition
    } catch (error) {
      console.error(error);
      return 'Error fetching meaning';
    }
  }

  function playAudio() {
    if (description.phonetics[0]?.audio) {
      let audio = new Audio(description.phonetics[0].audio);
      audio.play();
    }
  }

  const handleWordDoubleClick = async (word, event) => {
   // setHoveredWord(word);

    const { clientX, clientY } = event;
    const scrollOffset = window.scrollY;

    setTooltipPosition({ top: clientY+scrollOffset, left: clientX });

    try {
      const meaning = await fetchMeaning(word);
      if(meaning)
      {
      setDescription(meaning);
      setTooltipVisible(true);
      }
      else
      {
                setDescription('');
      }
    } catch (error) {
      console.error(error);
      setDescription('error fetching meaning');
      setTooltipVisible(true);
    }
  };

  const closeTooltip = () => {
    setTooltipVisible(false);
   // setHoveredWord('');
  };

  const words = text.split(/(\w+|\s+|\W)/);
  console.log(words);
  // const textWithMeanings = words.map((word, index) => 
  // { const wordWithMeaning = { word, meaning: '' }; if (description && description.word === word) { wordWithMeaning.meaning = (
  //   <div className="custom-tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
  //   <div className="close-button"> <span className='word'>{description.word}{' '}</span> <button onClick={closeTooltip}> <AiFillCloseCircle size="25px" className="close-icon"></AiFillCloseCircle> </button> </div> <div className='pronun'> <span className='tit'>Pronunciation</span> <button onClick={() => playAudio()}> <FcSpeaker size="26px" /></button> </div> <h4>Parts of speech: </h4> <p>{description.meanings[0].partOfSpeech}</p> <h4>Definition:</h4> <p>{description.meanings[0].definitions[0].definition}</p> <h4>Example:</h4> <p>{description.meanings[0].definitions[0].example}</p> </div> ); } return ( <span key={index}> {word} {wordWithMeaning.meaning} </span> ); });
  return (
    <div className="content-container">
      {words.map((word, index) => (
        <span key={index}>
          <a
            className="interactive-word"
            id={`word-${word}`}
            onDoubleClick={(e) => handleWordDoubleClick(word, e)}
          >
            {word}
          </a>
          
        </span>
      ))}
      {description!==''&&tooltipVisible && (
        <div className="custom-tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          <div className="close-button" >
          <span className='word'>{description.word}{' '}</span>
          <button  onClick={closeTooltip}>
          
            <AiFillCloseCircle size="25px" className="close-icon"></AiFillCloseCircle>
          </button>
          </div>
          <div className='pronun'>
            <span className='tit'>Pronunciation</span> 
            <button onClick={() => playAudio()}>
              <FcSpeaker size="26px" />
            </button>
          </div>
          <h4>Parts of speech: </h4>
          <p>{description.meanings[0].partOfSpeech}</p>
          <h4>Definition:</h4>
          <p>{description.meanings[0].definitions[0].definition}</p>
          <h4>Example:</h4>
          <p>{description.meanings[0].definitions[0].example}</p>
        </div>
      )}
    </div>
  );
}

Dictionary.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Dictionary;

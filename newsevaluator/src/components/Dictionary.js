import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FcSpeaker } from "react-icons/fc";
import './Dictionary.scss';
import PropTypes from 'prop-types';
function Dictionary({data}) {
    const [text,setText]=useState('');
    const [hoveredWord, setHoveredWord] = useState('');
    const [description, setdescription] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [fetchTimeout, setFetchTimeout] = useState(null);
    useEffect(()=>{
        setText(data)
    },[data]);
    const fetchMeaning=async (word)=>{
      try {
        const response = await axios.get(`http://localhost:8080/description`,{params:{word:word}});
        return response.data[0]; // Assuming the API response provides the definition
      } catch (error) {
        console.error(error);
        return 'Error fetching meaning';
      }
    }
    function playAudio() {
      let audio = new Audio(description.phonetics[0].audio);
      audio.play();
    }
    const handleWordHover = async (word,event) => {
      clearTimeout(fetchTimeout);
      setHoveredWord(word);
      console.log(hoveredWord);
      
      const timeout=setTimeout(async ()=>{
        if (word) {
          const { clientX, clientY } = event;
        setTooltipPosition({ top: clientY, left: clientX });
            try {
                const meaning = await fetchMeaning(word);
                setdescription(meaning);
            } catch (error) {
                console.error(error);
                setdescription('Error fetching meaning');
            }
        } else {
            setdescription('');
        }
      });
      setFetchTimeout(timeout)
      ;
  };
      const words = text.split(' ')
  return (
    <div className='content-container'>{
         words.map((word, index) => (
          <>
          <a
            key={index}
            className="interactive-word"
            id={`word-${word}`}
            onMouseOver={(e) => handleWordHover(word,e)}
            onMouseOut={() => setHoveredWord('')}
          >
            {word}{' '}
          </a>
         &nbsp;&nbsp;&nbsp;
          </>
        ))
        }
        {
           hoveredWord && description && (<div className='custom-tooltip' style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
            <h2>
              {description.word}{" "}
              <button
                onClick={()=>{playAudio();}}>
                  <FcSpeaker size="26px"/>
              </button>
            </h2>
            <h4>Parts of speech: </h4>
            <p>{description.meanings[0].partOfSpeech}</p>
            <h4>Definition:</h4>
            <p>{description.meanings[0].definitions[0].definition }</p>
            <h4>Example:</h4>
            <p>{description.meanings[0].definitions[0].example}</p>
           </div>)
        }</div>
  )
}
Dictionary.propTypes={
  data:PropTypes.string.isRequired
};
export default Dictionary
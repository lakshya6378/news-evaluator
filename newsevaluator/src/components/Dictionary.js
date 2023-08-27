import React, { useEffect, useState } from 'react'

function Dictionary({data}) {
    const [text,setText]=useState('');
    const [hoveredWord, setHoveredWord] = useState('');
    useEffect(()=>{
        setText(data)
    },[data]);
    const handleWordHover = (word) => {
        setHoveredWord(word);
      };
      const words = text.split(' ')
  return (
    <div>{
         words.map((word, index) => (
          <span
            key={index}
            className="interactive-word"
            onMouseOver={() => handleWordHover(word)}
            onMouseOut={() => setHoveredWord('')}
          >
            {word}{' '}
          </span>
        ))
        }</div>
  )
}

export default Dictionary
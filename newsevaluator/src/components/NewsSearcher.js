import React from 'react';
import { useState } from 'react';
import './newssearcher.scss';
import { Heading } from '@chakra-ui/react';

function NewsSearcher() {
  const [searchText,setSearchText]=useState('');
  const HandleChange=(event)=>{
    setSearchText(event.target.value);
  }
    
  return (
    <>
    <Heading>Search Latest News</Heading>
    <div className='SearchContainer'>
      <div className='input-Container'>
      <input type={'text'} value={searchText} onChange={HandleChange}/>
      <div className='search-icon'>
        <img src=''></img>
      </div>
      </div>
       
    </div>
    <div className="color-line"></div>
    </>
  )
}

export default NewsSearcher
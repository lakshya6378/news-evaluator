import React from 'react';
import { Heading } from '@chakra-ui/react';
//import { AspectRatio } from '@chakra-ui/react';
import videoUrl from './km_20230918-1_1080p_60f_20230918_232135.mp4';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";
import "./Tutorials.scss";

export default function Tutorials() {
  return (
    <>
      <div style={{ paddingBottom: '40px' }}>
        <Heading margin='10px'>Our Product Tutorial</Heading>
        <div className='player-container'>
      {/* Adjust margin and maxWidth as needed */}
      <Player
        playsInline
        src={videoUrl}
      />
      </div>
     
    </div>
      <div className='color-line'></div>
    </>
  );
}

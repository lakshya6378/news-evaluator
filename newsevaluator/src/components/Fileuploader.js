import React, { useState } from 'react'
import Dictionary from './Dictionary';
import {Heading} from '@chakra-ui/react';
import './Fileuploader.scss'
function Fileuploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataUrl, setDataUrl] = useState(null);
  const [data,setdata]=useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("selectedfile="+selectedFile);
  };
console.log(selectedFile);
  const PerformOcr=()=>{
    if(selectedFile)
    {
      let api="https://script.google.com/macros/s/AKfycbxTxk77TVNhMYcv1trBCwILLwVjeupZp2F6zqiBBfosF2CTPJ0PnwqhfU1hQuGvccRrxQ/exec";
     let fr=new FileReader();
     fr.readAsDataURL(selectedFile);
     fr.onload=async ()=>{
      const res=fr.result;
      setDataUrl(res);
      console.log(dataUrl);
      let b64=res.split("base64,")[1];
      console.log("base64 url "+b64);
      await fetch(api,{
        method:"POST",
        body:JSON.stringify({
          file:b64,
          type:selectedFile.type,
          name:selectedFile.name
        })
      })
      .then(res=>res.text())
      .then(data=>{
           setdata(data);
           console.log(data);
      })
     }
    }
    
  }
  return (
    
    <div  
    className='Ocr' >
      <Heading>Select a file</Heading>
      <div className='input'>
        <label htmlFor='file' className='button'>Choose File</label>
        <input 
    
        type='file'   
        className='file' 
        id='file'
        onChange={handleFileChange}  
        />
        </div>
      <button className='btn' onClick={PerformOcr}>Perform ocr</button>
      <span>result</span>
      <Dictionary data={data}></Dictionary>
    </div>
  )
}

export default Fileuploader
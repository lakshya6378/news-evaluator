import React, { useEffect, useState } from 'react'
import Dictionary from './Dictionary';

function Fileuploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataUrl, setDataUrl] = useState(null);
  const [data,setdata]=useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const PerformOcr=()=>{
    if(selectedFile)
    {
      let api="https://script.google.com/macros/s/AKfycbxTxk77TVNhMYcv1trBCwILLwVjeupZp2F6zqiBBfosF2CTPJ0PnwqhfU1hQuGvccRrxQ/exec";
     let fr=new FileReader();
     fr.readAsDataURL(selectedFile);
     fr.onload=async ()=>{
      const res=fr.result;
      setDataUrl(res);
      let b64=res.split("base64,")[1];
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
    
    <div className='Ocr'>
      <span>Select a file</span>
      <input type='file' className='file' onChange={handleFileChange}></input>
      <button className='btn' onClick={PerformOcr}>Perform ocr</button>
      <span>result</span>
      {/* <Dictionary data={data}></Dictionary> */}
      <div>{data}</div>

    </div>
  )
}

export default Fileuploader
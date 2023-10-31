import React, { useState ,useRef, useContext} from 'react'
import Dictionary from './Dictionary';
import {Heading} from '@chakra-ui/react';
import './Fileuploader.scss';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {storage} from '../firebase';
import { Authcontext } from '../context/Authcontext';
import axios from 'axios';
function Fileuploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataUrl, setDataUrl] = useState(null);
  const [data,setdata]=useState("");
  const [loading,setloading]=useState(false);
  const fileInputRef = useRef(null);
  const {currentUser}=useContext(Authcontext);
  const [progress,setprogress]=useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("selectedfile="+selectedFile);
  };
console.log(selectedFile);
  const PerformOcr=()=>{
    if(selectedFile)
    {
      setloading(true);
      if(currentUser)
      {
        const date=new Date().getTime();
          const storageRef=ref(storage,`/files/${selectedFile.name}${date}`);
          const uploadTask=uploadBytesResumable(storageRef,selectedFile);
          uploadTask.on("state_changed",(snapshot)=>{
            const prog=Math.round(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setprogress(prog);
          },(err)=>console.log(err),
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then((url)=>{
              const filedetail={
                filename:selectedFile.name,
                fileurl:url,
                uid:currentUser.id
              }
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/filedetails`,filedetail)
                .then((res)=>{
                  if(res.data.Status==="Success")
                  alert("data uploaded successfully");
                else
                alert("error");
                })
                .catch((err)=>alert(err))
            });
          })
      }
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
           setloading(false);
      })
     }
    }
    
  }
  const clickFileInput=(event)=>{
    const x = event.clientX;
    const y = event.clientY;

    // Get the coordinates of the button element
    const button = fileInputRef.current.getBoundingClientRect();
    const buttonX = button.left;
    const buttonY = button.top;

    // Define the excluded area by setting the coordinates of the button area
    const excludedArea = {
      left: buttonX,
      right: buttonX + button.width,
      top: buttonY,
      bottom: buttonY + button.height,
    };

    // Check if the click event coordinates are within the excluded area
    if (
      x >= excludedArea.left &&
      x <= excludedArea.right &&
      y >= excludedArea.top &&
      y <= excludedArea.bottom
    ) {
      return; // Do nothing if the click is within the excluded area
    }

    // If the click is outside the excluded area, trigger the file input click
    fileInputRef.current.click();

  }
  return (
    <>
    {!data&&!loading&&
    <div  
    className='Ocr' >
      <div className='headercontainer'>
        <img className='titleLogo' src=""></img>
      <Heading  className="heading">AI NEWS GENRATOR</Heading>
      <p>Upload your article as Image or PDF for generate AI news</p>
      {
          selectedFile&&<div className='filename'>Selected file:{selectedFile.name}</div>
        }
      </div>
      <div className='inputcontainer' onMouseDown={clickFileInput}>
      <div className='input'>
        <label htmlFor='file' className='button'>Choose File</label>
        <input 
    
        type='file'   
        className='file' 
        id='file'
        onChange={handleFileChange} 
        ref={fileInputRef}  
        />
        </div>
        </div>
  
      <button className='btn' onClick={PerformOcr}>Create News</button>
     
    </div>
    }
     {
        loading&&<>
        <div className='animationcontainer'>
      <svg className='svg'>
        <circle cx="70" cy="70" r="70">

        
        </circle>
        </svg>
        </div>
      <div>uploaded {progress}%</div>
      </>
}
{
  data&&
  <>
  <h2 className="next-uploader">upload another PDF or img?</h2>
  <button className="reupload-btn" onClick={()=>{setdata("")}}>go to upload section</button><br></br>
  <span className='resultheading'>Result</span>
      <Dictionary data={data}></Dictionary>
  </>
}
    <div className='color-line'></div>
    </>
  )
}

export default Fileuploader
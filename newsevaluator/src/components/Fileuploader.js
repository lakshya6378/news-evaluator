import React, { useState ,useRef, useContext} from 'react'
import Dictionary from './Dictionary';
import {Heading} from '@chakra-ui/react';
import './Fileuploader.scss';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {storage} from '../firebase';
import { Authcontext } from '../context/Authcontext';
import axios from 'axios';
import OpenAI from 'openai';
const openai = new OpenAI(
  {
      apiKey:process.env.REACT_APP_OPENAI_KEY,
      dangerouslyAllowBrowser: true,
  }
);
function Fileuploader() {
  const [selectedFile, setSelectedFile] = useState(null);
 // const [dataUrl, setDataUrl] = useState(null);
  const [data,setdata]=useState("");
  const [loading,setloading]=useState(false);
  const fileInputRef = useRef(null);
  const {currentUser,updatetext}=useContext(Authcontext);
  const [summary,setsummary]=useState("");
  const [textvisible,settextvisible]=useState(false);
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const PerformOcr = async () => {
    try {
      if (selectedFile) {
        setloading(true);
        settextvisible(true);
  
        if (currentUser) {
          const date = new Date().getTime();
          const storageRef = ref(storage, `/files/${selectedFile.name}${date}`);
          const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
         await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                /* eslint-disable */
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              },
              reject,
              async () => {
                try {
                  const url = await getDownloadURL(uploadTask.snapshot.ref);
                  const filedetail = {
                    filename: selectedFile.name,
                    fileurl: url,
                    uid: currentUser.id,
                  };
  
                  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/filedetails`, filedetail);
  
                  if (response.data.Status === "Success") {
                    alert("Data uploaded successfully");
                  } else {
                    alert("Error");
                  }
  
                  resolve();
                } catch (err) {
                  reject(err);
                }
              }
            );
          });
        }
  
        const api = "https://script.google.com/macros/s/AKfycbxTxk77TVNhMYcv1trBCwILLwVjeupZp2F6zqiBBfosF2CTPJ0PnwqhfU1hQuGvccRrxQ/exec";
        const fr = new FileReader();
  
        const result=  await new Promise((resolve, reject) => {
          fr.readAsDataURL(selectedFile);
  
          fr.onload = () => {
            const res = fr.result;
            // setDataUrl(res);
            const b64 = res.split("base64,")[1];
  
            fetch(api, {
              method: "POST",
              body: JSON.stringify({
                file: b64,
                type: selectedFile.type,
                name: selectedFile.name,
              }),
            })
              .then((res) => res.text())
              .then((data) => {
                setdata(data);
                updatetext(data);
                setloading(false);
                resolve(data);
              })
              .catch((err) => reject(err));
          };
        });
        return result;
      }
      else
      {
alert("please select a pdf file or image");
      }
    } catch (err) {
      console.error(err);
      setloading(false);
      
    }
  };
  
  
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
  const getsummary = async () => {
    if (selectedFile) {
      try {
        const extracttext = await PerformOcr();
        setloading(true);
        settextvisible(false);
        const prompt=`${extracttext} give the summary of this paragraph`
       const completion = await openai.chat.completions.create({
         messages: [{ role: "system", content: prompt }],
         model: "gpt-3.5-turbo",
       });
 
       setsummary(completion.choices[0].message.content);
       setloading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please select a file");
    }
  };
 
  return (
    <>
    {!data&&!loading&&
    <div  
    className='Ocr' >
      <div className='headercontainer'>
        <img className='titleLogo' src=""></img>
      <Heading  className="heading">AI NEWS GENERATOR</Heading>
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
      <div>
      <button className='btn' onClick={PerformOcr}>Create Text</button>
      <button className="btn" onClick={getsummary}>Get Summary{summary}</button>
      </div>
     
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
      </>
}
{
  data&&
  <>
  <h2 className="next-uploader">upload another PDF or img?</h2>
  <button className="reupload-btn" onClick={()=>{setdata(""); updatetext(""); setsummary('');}}>go to upload section</button><br></br>
  
  <span className='resultheading'>Result</span>
  {   summary!==''&&<div className="summary-container" style={{width:'80%',textAlign:'center',backgroundColor:'white',minHeight:'200px',fontSize:'16px',margin:'auto', padding:'10px 2%'}}>
    <h2>SUMMARY</h2>
    <div>
    {summary}
    </div>
    </div>
  }
 { textvisible && <Dictionary data={data}></Dictionary>}
  </>
}
    <div className='color-line'></div>
    </>
  )
}

export default Fileuploader
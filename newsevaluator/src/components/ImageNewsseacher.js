import React,{useCallback, useRef,useState,useContext} from 'react'
import Webcam from "react-webcam";
import { Authcontext } from '../context/Authcontext';
import axios from 'axios';
import {storage} from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import OpenAI from 'openai';
import Card from './Card';
import './ImageNewssearcher.scss';

function ImageNewsseacher() {
  const webcamRef = useRef(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [imgSrc,setImgsrc]=useState(null);
  const {currentUser}=useContext(Authcontext);
  const [progress,setprogress]=useState(0);
  const [text,settext]=useState("");
  const [keywords,setkeywords]=useState("");
  const [newsArticles, setNewsArticles] = useState([]);
  const [visible, setVisible] = useState(10); // initially show 8 articles
  const[showresult,setshowresult]=useState(false);
  const openai = new OpenAI(
    {
        apiKey:process.env.REACT_APP_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
    }
  );

  const capture=useCallback(()=>{
    const imageSrc = webcamRef.current.getScreenshot();
    setImgsrc(imageSrc);
  },[webcamRef])

  const retake = () => {
    setImgsrc(null);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 5); // load 4 more articles
  };
  
  const getKeywords=async (data)=>{
    console.log(text);
    const prompt=`${data} find keywords for news article and separate them with line break`
    try { 
     const completion = await openai.chat.completions.create({
       messages: [{ role: "system", content: prompt }],
       model: "gpt-3.5-turbo",
     });

     setkeywords(completion.choices[0].message.content);
     console.log(completion.choices[0].message.content)
     console.log(keywords)
     return completion.choices[0].message.content;
    } catch (error) {
      console.log(error);
    }
  }

  const getnewsarticle=async (key)=>{
    const topicsArray = key.split(/\n|,/);

    // Filter out any empty strings (e.g., due to leading/trailing line breaks)
    const filteredTopicsArray = topicsArray.filter(topic => topic.trim() !== '');
    
    // Construct the query string
    const queryString = filteredTopicsArray.map(topic => `"${topic}"`).join(" OR ");
    

    const encodedQuery = encodeURIComponent(queryString);
    console.log(encodedQuery);
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${encodedQuery}&apiKey=af96cd3905e346f08e7c37d50e88adfa`, {
        withCredentials: false,
        "Access-Control-Allow-Origin": "*"
      });
      setNewsArticles(response.data.articles);
      setshowresult(true);
    } catch (error) {
      console.error('Error fetching news articles:', error);
    }
  }

  const extractfiletext=async (imageblob)=>{
     try
     {
       if(imageblob)
       {
        const api = "https://script.google.com/macros/s/AKfycbxTxk77TVNhMYcv1trBCwILLwVjeupZp2F6zqiBBfosF2CTPJ0PnwqhfU1hQuGvccRrxQ/exec";

        const fr = new FileReader();
     
    const data =  await new Promise((resolve, reject) => {
             fr.readAsDataURL(imageblob);
     
             fr.onload = async () => {
               const res = fr.result;
               // setDataUrl(res);
               const b64 = res.split("base64,")[1];
     
               await fetch(api, {
                 method: "POST",
                 body: JSON.stringify({
                   file: b64,
                   type: imageblob.type,
                   name: "captured_img",
                 }),
               })
                 .then((res) => res.text())
                 .then((data) => {
                   settext(data);
                   resolve(data);
                 })
                 .catch((err) => reject(err));
             };
           });
           return data;

       }

     }
     catch(err)
     {
       console.log(err);
     }


  }

  const generateNews = async () => {
    try
    {
      const imageblob = dataURItoBlob(imgSrc);
        const date = new Date().getTime();
        const filename = `captured_img_${date}`;
     if(currentUser)
     {
        
        const storageRef = ref(storage, `/files/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, imageblob);
        
       await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setprogress(prog);
            },
            reject,
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                const filedetail = {
                  filename: filename,
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
       
    const data=await extractfiletext(imageblob);
    console.log("data"+data)
     const key =  await  getKeywords(data);
       await getnewsarticle(key);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  return (
    <>
    {!scannerVisible&&
    <button className='image search btn' onClick={()=>{setScannerVisible(true)}}>
      search by image
    </button>
   }
   {
    scannerVisible&&
    <div className='image search'>
      {
        imgSrc ? (
          <>
          <img src={imgSrc} alt="webcam" style={{borderRadius:"10px",margin:"auto"}}/>
          </>
        ) :(
          <>
          <button className='close btn' onClick={()=>{setScannerVisible(false)}}>
        close
      </button>
       <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        height={'90%'} width={'95%'}
        style={{borderRadius:'10px',border:'2px solid black',margin:'auto'}}

      />
     
      </>
        )
     }
      <div className="btn-container">
      {imgSrc ? (
        <div className="photoSelector">
          <button className='btn'onClick={retake}>Retake photo</button>
          <button className='btn'onClick={generateNews}>select photo</button>
          </div>
        ) : (
          <button className='btn' onClick={capture}>Capture photo</button>
        )}
      </div>
      </div>
   }
     {
        showresult && newsArticles.length === 0 && <h2>No articles found</h2>
      }
      {
        showresult && <button className="clear-button" onClick={() =>{setshowresult(false);
          setNewsArticles([]);
  
        }}>Clear</button>
      }
      <div className="card-container">
        {newsArticles.slice(0,visible).map((article,index) => (
          <Card
            key={index}
            title={article.title}
            description={article.description}
            url={article.url}
            image={article.urlToImage}
            date={article.publishedAt}
          />
        ))}
        
      </div>
      {visible < newsArticles.length && 
      <button onClick={loadMore} className="load-more">Load More</button>
    }
   <div>{progress}</div>
    <div className='color-line'></div>
    </>
  )
}

export default ImageNewsseacher
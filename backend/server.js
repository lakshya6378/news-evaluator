import express from 'express'
import mysql from "mysql" 
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";
import axios from "axios";
import OpenAI from "openai";


const salt=10;
const app=express();
app.use(cors({
    origin: 'http://localhost:3000',//'https://news-ai-front.onrender.com'
    methods:["POST","GET"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())
app.set("trust proxy", 1);
app.use(express.urlencoded({extended: false}))

const port=8080;
const openai = new OpenAI(
    {
        apiKey:`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`,
    }
);
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"lakshya",
    database:'signup'
})

const db2=mysql.createConnection({
    host:"newsai.cczedsjmh0ei.ap-south-1.rds.amazonaws.com",
    user:"root",
    password:"lakshya1234",
    database:'signup'
})

const verifyuser=(req,res,next)=>{
const token=JSON.parse(req.query.token);
console.log(token);
if(!token){
        return res.json({Error:"you are not authenticated"})
}
      else {
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error:"token is not correct"})
            }
            else{
                req.name=decoded.name;
                next();
            }
        })
     }
}
app.get("/",verifyuser,(req,res)=>{
   return  res.json({Status: "Success",name:req.name});
})

// app.post('/register',(req,res)=>{
//     console.log(req.body);
//     const sql="INSERT INTO login (`name`,`email`,`password`) values(?)"
//     bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
//         if(err) return res.json({Error:"error for hashing password"});
//     const values=[
//         req.body.name,
//         req.body.email,
//         hash
//     ]
//     console.log(req.body);
//   db.query(sql,[values],(err,result)=>{
//     if(err) return res.json({Error:"inserting data error in server"});
//     return res.json({Status:"Success"})
//   })
// })
//   console.log(req.body);
// })
app.post('/register',(req,res)=>{
    console.log(req.body);
    const sql="INSERT INTO login (`name`,`email`,`password`) values(?)"
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json({Error:"error for hashing password"});
    const values=[
        req.body.name,
        req.body.email,
        hash
    ]
    console.log(req.body);
  db2.query(sql,[values],(err,result)=>{
    if(err) return res.json({Error:"inserting data error in server"});
    return res.json({Status:"Success"})
  })
})
  console.log(req.body);
})

app.post('/login',(req,res)=>{
    console.log(req.body);
    const sql='select * from login where email = ?';
    db2.query(sql,[req.body.email],(err,data)=>{
        if(err) return res.json({Error:"login error in server"});
        
        if(data.length>0){
             bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
                if(err)
                return res.json({Error:"password compare error"})
            if(response){
                const name=data[0].name;
                const token=jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'});
                const {password,...other}=data[0];
                res.cookie('token',token);
                 
                return res.json({Status:"Success",Data:other,token});
            }
            else {
                return res.json({Error:"password not matched"})
            }
             })
        }
        else{
            return res.json({Error:"No email exists"})
        }
    })

})
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})
app.get('/description',async (req,res)=>{
    const word=req.query.word;                                  
    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    console.log(word);
    try{
        const response=await axios.get(url);
        const data=response.data;
        console.log(data);
        return res.json(data);
        
    }
    catch(error){
        res.json(error);
    }
})

app.post('/filedetails', async (req, res) => {
    const { filename, fileurl, uid } = req.body;
  
    const query = "INSERT INTO uploaddetail (filename, uid, fileurl) VALUES (?, ?, ?)";
    const values = [filename, uid, fileurl];
  
    db2.query(query, values, (err, result) => {
      if (err) {
        return res.json({ Status: "Error", Error: "Data inserting error" });
      }
      return res.json({ Status: "Success" });
    });
  });

  app.get('/history',async (req,res)=>{
    const id = req.query.id;
    console.log(id);
    const query="SELECT filename,fileurl from uploaddetail where uploaddetail.uid=?";
    db2.query(query,[id],(err,result)=>{
        if(err){
            return res.json({ Status: "Error", Error: "Unable to fetch history please try again" });
        }
        console.log(result.length)
            return res.json({Status:"Success",data:result});
        
    })
  })
  app.get('/summary',async(req,res)=>{
    const text=req.body.params;
    console.log("extracted text: ",text);
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${text} give the summary of above paragraph` }],
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices[0].message);
      res.send({summary:completion.choices[0].message})

  })
app.listen(port,()=>{
    console.log("server is running at https//localhost:8080");
})
import express from 'express'
import mysql from "mysql" 
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";
import axios from "axios";


const salt=10;
const app=express();
app.use(cors({
    origin:'http://localhost:3000',
    methods:["POST","GET"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())

app.use(express.urlencoded({extended: false}))
app.use('/img', express.static('storage'))

const port=8080;

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"lakshya",
    database:'signup'
})

const db2=mysql.createConnection({
    host:"database-1.cdgevw5j63lp.ap-south-1.rds.amazonaws.com",
    user:"root",
    password:"lakshya1234",
    database:'signup'
})

const verifyuser=(req,res,next)=>{
const token=req.cookies.token;
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
                console.log(data)
                const name=data[0].name;
                const token=jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'});
                const {password,...other}=data[0];
                res.cookie('token',token);
                 
                return res.json({Status:"Success",Data:other})
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


app.listen(port,()=>{
    console.log("server is running at https//localhost:8080");
})
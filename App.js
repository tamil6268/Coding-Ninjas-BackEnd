const express=require('express');
const app=express();
const cors=require('cors');
const Router=require('./Route/User');
const {Auth}=require('./Controller/Auth')
// const jwt=require('jsonwebtoken')
// const {SECRET_KEY} =require('./Controller/User.js');


app.use(express.json());
app.use(express.urlencoded({extended:true}));//is must while getting req from backend
app.use(cors());
app.use(Router);
//user Authentication
app.post('/user',Auth,(req,res)=>{
    res.send({message:"Token Verified",user:req.token})
})
// app.post('/User/Course',AuthPayment,(req,res)=>{
   
// })
app.listen(8080,()=>{
    console.log("Server Started at the port 8080")
})
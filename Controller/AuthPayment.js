const jwt=require('jsonwebtoken');
const {SECRET_KEY} =require('./User.js');
const AuthPayment=(req,res,next)=>{
   try{
       console.log(req.body.token)
    //    const token=req.headers.authorization.split(' ')[1]; //for postman check 
       const token=req.body.token;
    //    console.log(token)
       req.token=jwt.verify(token,SECRET_KEY)
       console.log(req.token)
       next()
    }catch(error){
       res.send({message:"error",error})
    }
}
module.exports={AuthPayment}
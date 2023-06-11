const jwt=require('jsonwebtoken');
const {SECRET_KEY} =require('./User.js');
const Auth=(req,res,next)=>{
   try{
       console.log(req.headers)
    //    const token=req.headers.authorization.split(' ')[1]; //for postman check 
       const token=req.headers.jwttoken;
       console.log(token)
       req.token=jwt.verify(token,SECRET_KEY)
       console.log(req.token)
       next()
    }catch(error){
       res.send({message:"error",error})
    }
}
module.exports={Auth}
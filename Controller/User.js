const dbConnection = require("../Config/DataBase");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt=require('jsonwebtoken');
const SECRET_KEY="CO12Di34Ni78N1Ja#Tam!"

const Register = async (req, res) => {
  const data = req.body;
//   const DATA=await dbConnection.deleteDb({Name:data.Name})
//   return res.status(200).send(DATA)

//   const findingOldUser=await dbConnection.findDb({Name:data.Name})
//   if (findingOldUser) {
//       res.status(500).send({message:"User Already Exist"})
//   }else{
    bcrypt.hash(data.Password, saltRounds, async (error, hashPassword) => {
        if (error) { 
          res.send({
            message: "Something went wrong while hashing the password"
          });
        } else {
          console.log(hashPassword);
          const userCredentials = {
            Name: data.Name,
            Email: data.Email,
            Password: hashPassword,
            Contact: data.Contact,
            Date:new Date().toLocaleString(),
          };
          try {
            const DATA = await dbConnection.insertDb(userCredentials);
            console.log(userCredentials);
            return res
              .status(200)
              .send({ message: "Successfully Registerd", userDetails: DATA });
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .send({ message: "Something Went Wrong while storing in database" });
          }
        }
      });
//   }
};

const Login=async(req,res)=>{
    const userData = req.body;
      const userName=userData.Name;
      const queryCheck = { Name: userData.Name };
      const storedData = await dbConnection.findDb(queryCheck);
        storedData.map(async(items) => {
            // console.log("Entering in map",items)
            if(userData.Name == items.Name) {
                // console.log("username verifyied")
                await bcrypt.compare(userData.Password,items.Password,(error,valid)=>{
                    if(error){
                        // console.log("password incorrect")
                        res.status(500).send({message:"Password Incorrect"})
                    }else{
                        // console.log("Password matching")
                        if(valid==true){
                            // console.log("logged succefully")
                            jwt.sign(items,SECRET_KEY,(error,token)=>{
                                if(error){
                                    res.send({message:"Getting Error While Generating token",error})
                                }else{
                                    console.log(token)
                                    // res.send({message:"Token Generated Successfully",token})
                                    res.status(200).send({message:`${userName} Sucessfully logged In`,userName:userData.Name,Token:token})
                                }
                            })
                        }
                    }
                })
            } else {
                // console.log("Invalid username not matching")
              res.status(400).send({message:"Invalid Data..."});
            }
          });
}
const RequestCall=async(req,res)=>{
  try {
    const DATA = await dbConnection.insertRequestDb(req.body);
    return res
      .status(200)
      .send({ message: "Request Recived ,We will connet you Soon..", userDetails: DATA });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Something Went Wrong while storing in database" });
  }
}
const EntrolledUsers=async(req,res)=>{
  const data=req.body.state
  // const token=req.body.token
  data.userDetails=req.token
  console.log("User",data)
  
  try {
    const DATA = await dbConnection.insertEntrolledUsersDb(data);
    return res
      .status(200)
      .send({ message: "Request Recived ,We will connet you Soon..", userDetails: DATA });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Something Went Wrong while storing in database" });
  }
}
const EntrolledUserController=async(req,res)=>{
      const storedData = await dbConnection.findEntrolledUsersDb({});
      res.send({message:"Entrolled-UserDetails",State:storedData})
}
module.exports = {
  Register,
  Login,
  SECRET_KEY,
  RequestCall,
  EntrolledUsers,
  EntrolledUserController
};

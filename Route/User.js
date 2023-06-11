const express=require('express');
const router=express.Router();
const UserController=require('../Controller/User');
const {AuthPayment}=require('../Controller/AuthPayment')

router.post('/register',UserController.Register);
router.post('/login',UserController.Login);
router.post('/requestCall',UserController.RequestCall);
router.post('/User/Course',AuthPayment,UserController.EntrolledUsers);
router.get('/User/Course',UserController.EntrolledUserController);
module.exports=router;
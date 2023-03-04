const router = require("express").Router();

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth");
const { regisiterRules, loginRules, validator } = require("../middleware/validator");
require("dotenv").config({path:"../config/.env"})

const User = require("../model/userModel")


// router.get("/hello", (req,res)=>{
//     res.send("auth app works")
// }) 

//register
// http://localhost:4996/api/auth/register

router.post("/register",regisiterRules(), validator , async(req,res)=>{


    const {name, lastName, email, Password} = req.body;
    try {
// simple validation
//check fileds
// if(!name || !lastName || !email || !Password ) {
//     return res.status(400).json({msg:"please enter all fields"})
// }
// // check for existing user
let user = await User.findOne({email})
if(user){
    return res.status(400).json({msg:' User alredy exists'})
}
user = new User({name,lastName,email,Password})
const saltRounds = 10;
const hachedPassword = await bcrypt.hash(Password,saltRounds)
user.Password = hachedPassword
await user.save()

//sigh user
const payload ={
    id: user.id
}
const token = await jwt.sign(payload, process.env.secretOrKey,{expiresIn:60 * 60})
res.status(200).send({msg:"User registred", user, token})
    } catch (error) {
        res.status(500).send({msg : "Regiter server error!"})
        console.log(error)
    }
})
// Login
//http://localhost:4996/api/auth/login

router.post("/login",loginRules(), validator, async(req,res)=>{

   try {
    const {email,Password} = req.body;
    // if(!email || !Password ) {
    //     return res.status(400).json({msg:"please enter all fields"})
    // }
// check user
let user = await User.findOne({email})
if(!user){
    return res.status(400).json({msg: `User doesn't exists`})
}
// check Password

const isMatch = await bcrypt.compare(Password, user.Password)

if(!isMatch){
    return res.status(400).json({msg : 'bad credentials'})
}
// sigh user
const payload = {
    id:user.id,
    name : user.name
}
// token 
const token = await jwt.sign(payload, process.env.secretOrKey,{expiresIn:60 * 60})
res.status(200).send({msg:"User logged success", user, token})
  

} catch (error) {
    res.status(500).send({msg:"login server error"})
    console.log(error)
   }
})

//private routes

router.get("/user",isAuth ,(req,res) => {
    res.status(200).send({user : req.user})
})

module.exports = router 
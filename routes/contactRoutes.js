const express = require("express")
const router = express.Router()
const Contact = require("../model/contactModel")

router.get ("/hello", (req,res) =>{
    res.send("hello routing")
})

//add contact 
//path : http://localhost:4996/api/contact/user

router.post("/user", async (req,res)=> {
    try {
        const newContact = new Contact(req.body) 
         
        if(!req.body.name){
            res.status(400).send({message : "name is required"})
            return
        }

        if (!req.body.email){
            res.status(400).send({message : "email is required"})
          return
        }
       
        const response = await newContact.save()
        res.status(200).send({response : response, message :"user saved"})
    } catch (error) {
        res.status(500).send({message:"can not save user"})
        console.log(error)
    }
})
//get
//path: http://localhost:4996/api/contact
router.get("/", async(req,res)=>{
    try {
        const result = await Contact.find()
        res.status(200).send({response:result, message:"getting contacts"})
    } catch (error) {
        res.send({message:"can not get contacts"})
    }
})

router.get("/:id", async(req,res)=>{
    try {
        const result = await Contact.findOne({_id:req.params.id})
        if(result){
        res.status(200).send({response:result, message:"getting contact by id"})}
        else{
            res.status(400).send({message:"no contact with this id"})
        }
    } catch (error) {
        res.send({message:"can not get contact by id"})
    }
})

// delete contact
router.delete("/:id",async (req,res)=>{
    try {
        const result = await Contact.deleteOne({_id: req.params.id})
        res.status(200).send({response :result, message:'contact deleted'})
    } catch (error) {
        res.send({message : "can not delete contact"})
    }
})

//update one contact 
// Metode put
//path: http://localhost:4996/api/contact/:id
router.put("/:id", async(req,res)=>{
    try {
        const result = await Contact.updateOne({_id:req.params.id},{$set:{...req.body}})
        if(result){
            const newResult = await Contact.findOne({_id:req.params.id})
            res.status(200).send({response: newResult, message:"contact updated"})
        }else{
            res.status(400).send({message:" no user with this id"})
        }
    } catch (error) {
        res.status(500).send({message:"contact is not updated"})
    }
})

module.exports = router
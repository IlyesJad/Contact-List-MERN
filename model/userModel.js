const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {type : String, required :true},
    lastName : {type : String, required :true},
    email : {type : String , required : true, unique:true},
    Password : {type : String, required :true},
})

module.exports = User = mongoose.model("users",userSchema)
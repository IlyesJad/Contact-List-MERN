const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name : {type : String, required :true},
    email : {type : String , required : true},
    phone : String,
})

module.exports = Contact = mongoose.model("contacts",contactSchema)
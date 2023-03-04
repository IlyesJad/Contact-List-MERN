const mongoose = require("mongoose");

mongoose.set("strictQuery", false);


const connectDB = async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to database")
    } catch (error) {
        console.log(`connot connect to database:${error}`)
    }
}
 module.exports = connectDB;
const mongoose = require("mongoose");

// function to connect to the mongodb

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log("MongoDB is connected successfully")

    }catch(error){
        console.error("There is an error while connecting the database",error)
    }
}

module.exports = connectDB

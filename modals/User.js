const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
});

//export the user model

const User = mongoose.model("User", userSchema);
module.exports = User;

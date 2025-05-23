const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
        trim: true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin", "Students", "Visitors"]
    }
});

module.exports = mongoose.model("user",UserSchema);
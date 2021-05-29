const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: false 
    },
    name:{
        type:String,
        required:true,
        unique: false

    },
   

    password:{
        type:String,
        required:true,
        max:1023
    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);
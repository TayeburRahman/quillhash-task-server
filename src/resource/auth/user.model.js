const mongoose = require('mongoose')

// model step: 1
const userModel = new mongoose.Schema(
        {
            displayName: {
                type: String, 
                trim: true,
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
                unique: true,
            },
            username:{
                type: String,
                trim: true,
                
            }, 
            photo: String,
            password: {
                type: String, 
            },
        }
    );
     
module.exports = mongoose.model('users', userModel)

 
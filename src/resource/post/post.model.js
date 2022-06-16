const mongoose = require('mongoose')

// model
const postsModel = new mongoose.Schema(
        {
          userName: String,
          userEmail: String,
          image: String, 
          userID: {
            type: String,
            trim: true,
          },
          text: {
            type: Object, 
            trim: true,
            required:true
          }, 
          like: {
            type: Array,
            trim: true
           }, 
          block: {
            type:Array,  
          },
          love:{
            type: Array, 
            trim: true
           }
        }
    );
     
module.exports = mongoose.model('post', postsModel)
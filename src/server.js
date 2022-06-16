require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 5001 ;
const admin = require("firebase-admin");


//* FIREBASE INITIALIZE APP
 var serviceAccount = require("../socialmedia-a2c5f-firebase-adminsdk-sajf9-27948524da.json"); 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// response
const { createUsers, updateUsers, getUsers, getAllUsers } = require('./resource/auth/user.controller')
const { createPost, getUserPost, updatePost, deleteLike, updateLike, deleteLove, updateLove, updateStatus, getAllPost } = require('./resource/post/post.controller')

 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//* JWT VERIFIED FUNCTION
async function verifyToken(req, res, next) {  
  if (req.headers?.authorization?.startsWith('Bearer ')) {
      const idToken = req.headers.authorization.split('Bearer ')[1]
       try {
          const deCodedUser = await admin.auth().verifyIdToken(idToken)
          req.deCodedUserEmail = deCodedUser.email
      }
      catch {
      }
  }
  next()
}

// database connect
mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.yjiyu.mongodb.net/socialMedia?retryWrites=true&w=majority`).then(()=>
console.log('database connected successfully')
).catch((err)=>{
    console.log(err)
})


  app.post('/api/v1/post', createPost)
  app.get('/api/v2/post/:email', getUserPost) 
  app.patch('/api/v1/cardAll/:id', updatePost)
  app.patch('/api/v1/post/likeDelete/:id', deleteLike)
  app.patch('/api/v1/post/likeUpdate/:id', updateLike)
  app.patch('/api/v1/post/loveDelete/:id', deleteLove)
  app.patch('/api/v1/post/loveUpdate/:id', updateLove)
  app.patch('/api/v1/post/status/:id', updateStatus)
  app.get('/api/v1/AllPost', getAllPost)
 
  app.post('/api/v1/users', verifyToken, createUsers)
  app.get('/api/v1/users/:email',verifyToken, getUsers)
  app.get('/api/v2/allUsers', getAllUsers)
  app.patch ('/api/v2/users/:email', updateUsers)
 


 app.get('/', (req, res) => {
    res.send("Server Running")
})

 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
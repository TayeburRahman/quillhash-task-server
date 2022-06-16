const postsModel = require("./post.model") 

//  response 
const createPost= async (req, res) => { 
  try {
    const post = await postsModel.create(req.body) 
    return res.status(201).json({post, massages:"Successfully your post"})
  } catch (error) {
    return res.status(401).json({massages: error.massages})
  }
}

 const getUserPost = async (req, res) => {  
      try {
        const post = await  postsModel.find({
          userEmail: req.params.email
        })
 
        return res.status(201).json({post})
      } catch (error) {
        return res.status(401).json({massages: error.massages})
      }
  }

  const getAllPost = async (req, res) => {  
    try { 
     const data = await  postsModel.find({}) 
      return res.status(201).send(data) 
     } catch (error) {
      return res.status(401).json({massages: error.massages})
    }
}

  const updatePost= async (req , res) => {
  try {
       await postsModel.updateOne({
         email: req.params.email
        },
          req.body
      );
      res.status(201).json({massages:'Card Updated Successfully'});
  } catch (error) {
      return res
          .status(500).json({massages: error.massages})
  }
};
 
const deleteLike = async (req, res) => {
  console.log('req.params.id', req.params.id)
  try {
    await postsModel.update(
      { _id: req.params.id },
      { $pull: { 'like': { email: req.body.email } } }
    );

      return res.status(201).json({massages:'Card deleted Successfully'});
  } catch (error) {
      return res
          .status(500).json({massages: error.massages}) 
  }
};

const updateLike = async (req, res) => {
  console.log('req.params.id', req.params.id)
  try {
    await postsModel.update(
      { _id: req.params.id },
      { $set: { 'like': { email: req.body.email } } }
    );

      return res.status(201).json({massages:'Card deleted Successfully'});
  } catch (error) {
      return res
          .status(500).json({massages: error.massages}) 
  }
};

const deleteLove = async (req, res) => {
  
  try {
    await postsModel.update(
      { _id: req.params.id },
      { $pull: { 'love': { email: req.body.email } } }
    );

      return res.status(201).json({massages:'Card deleted Successfully'});
  } catch (error) {
      return res
          .status(500).json({massages: error.massages}) 
  }
};

const updateLove = async (req, res) => { 
  try {
    await postsModel.update(
      { _id: req.params.id },
      { $set: { 'love': { email: req.body.email } } }
    );

      return res.status(201).json({massages:'Card deleted Successfully'});
  } catch (error) {
      return res
          .status(500).json({massages: error.massages}) 
  }
};

const updateStatus = async (req, res) => { 
  console.log('user', req.params.id)
  try {
    await postsModel.update(
      { _id: req.params.id },
      { $set: { 'block': { email: req.body.email } } }
    );
      return res.status(201).json({massages:'Card deleted Successfully'});
  } catch (error) {
      return res
          .status(500).json({massages: error.massages}) 
  }
};

  module.exports={createPost , getUserPost, updatePost, deleteLike, updateLike, deleteLove, updateLove, updateStatus, getAllPost}
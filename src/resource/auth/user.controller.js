const userModel = require("./user.model")

 
//  response  
 const getUsers = async (req, res) => { 
      try {
       const email = {email: req.params.email}  
       const user = await  userModel.findOne(email) 
        return res.status(201).send(user) 
      } catch (error) {
        return res.status(401).json({massages: error.massages})
      }
  }

  const getAllUsers = async (req, res) => { 
    console.log('user', 'user')
    try { 
     const user = await  userModel.find({}) 
     console.log('user', user)

      return res.status(201).send(user) 
     } catch (error) {
      return res.status(401).json({massages: error.massages})
    }
}

 const createUsers= async (req, res) => { 
      try {
      const ExistingUser = await userModel.findOne({
        email: req.body.email,
        });

      if (ExistingUser) {
        return res.json({ user: ExistingUser });
      }

       const user = await userModel.create(req.body)
       return res.status(201).json({user})
     } catch (error) {
       return res.status(401).json({massages: error.massages})
     }
  }

 

  const updateUsers= async (req , res) => {
    
  try {
       await userModel.updateOne({
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


 
 
  module.exports={getUsers , createUsers, updateUsers, getAllUsers}
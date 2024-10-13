const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//user registration

exports.registerUser = async(req, res) => {
    const{name, email, password} = req.body;
    try{
        // check if user already exists
        const userExits = await User.findOne({email});
        if(userExits){
            return res.status(400).json({message: "The entered user is already exists"})
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({ message:"User Registered successfully"})
    } catch(error) {
          res.status(500).json({ message:"server error",error});
    }
};

// user login

exports.loginUser = async(req, res) => {
    const{email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"})
        }
        // check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "invalid password"})
        }
        //generate the JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email:user.email
            }
        })
      } catch(error) {
        res.status(500).json({ message:"server error",error});
  }
};


//Get the user profile
exports.getUserProfile = async (req, res) => {
    try {
      // `req.user` is set by the authentication middleware
      const user = await User.findById(req.user.id).select('-password');  // Exclude the password from response
  
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({
        message: `Welcome ${user.name} to your profile page!`,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            
        }
    });
    } catch(error) {
        res.status(500).json({ message:"server error",error});
  }
  };
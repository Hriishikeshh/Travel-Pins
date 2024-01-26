const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

//user register
router.post("/register",async (req,res)=>{
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password,salt);
        
        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashpassword,
        });

        //save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    }catch(err){
        res.status(500).json(err);
    }
});

//login user
router.post("/login", async (req, res) => {
    try {
        // Find user
        const user = await User.findOne({ username: req.body.username });
        
        // Check if the user exists
        if (!user) {
            return res.status(400).json("WRONG USERNAME OR PASSWORD");
        }

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        
        // Check if the password is valid
        if (!validPassword) {
            return res.status(400).json("WRONG USERNAME OR PASSWORD");
        }

        // Send response with user information
        res.status(200).json({ _id: user._id, username: user.username});
    } catch (err) {
        res.status(500).json(err);
    }
});


//user login
module.exports = router
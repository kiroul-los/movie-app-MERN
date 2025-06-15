import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";


// Function to create a new user
export const createUser = asyncHandler(async(req, res)=> {
    const {username, email, password} = req.body;
    // console.log(req.body);

    if(!username || !email || !password) {
        res.status(400).json({message: "Please fill all the fields"});
        return;
    }

    const userExists=await User.findOne({email});
    if(userExists) {
        res.status(400).json({message: "User already exists"});
        return;
    }
    try{
    // Hash the password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        isAdmin: false // Default value for new users
    });
        const token =createToken(res,newUser._id);
        res.status(201).json({
            message: "User created successfully",
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token
        });

    }catch (error) {
        res.status(500).json({message: "Error creating user"});
        return;
    }
});

//function for login user
export const loginUser=asyncHandler(async(req,res)=>{
    const {email, password} = req.body;

        if(!email || !password) {
        res.status(400).json({message: "Please fill all the fields"});
        return;
    }
    // Check if user exists
    const exisingUser=await User.findOne({email});
    if(!exisingUser) {
        res.status(400).json({message: "User does not exist"});
        return;
    }
})



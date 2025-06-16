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
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken(res, existingUser._id);

    return res.status(200).json({
        message: "User logged in successfully",
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        token
    });
});



export const logoutUser = asyncHandler(async (req, res) => {
    // Clear the cookie by setting its expiration date to the past
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });

    // Send a response indicating successful logout
    res.status(200).json({ message: 'User logged out successfully' });
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password'); // Exclude password field
    if (users.length === 0) {
        res.status(404).json({ message: 'No users found' });
        return;
    }
    res.status(200).json(users);
});

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password'); // Exclude password field
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.status(200).json(user);
});

export const updateCurrentUserProfile=asyncHandler(async (req,res)=>{
    const user=await User.findById(req.body._id);

    if(user){
            user.username= req.body.username||user.username;
            user.email= req.body.email||user.email;

        if(req.body.password){
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await user.save();
        res.status(200).json({
            message: 'User profile updated successfully',
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });

    }else{
        res.status(404).json({ message: 'User not found' });
    }

})

const userModel = require("../models/user.model");//import user model
const bcrypt = require("bcryptjs");//import bcrypt for password hashing
const jwt = require("jsonwebtoken");//import jwt for token generation

async function registerUser(req,res){//register user function

    const {fullName,email,password} = req.body;

    const isUserAlreadyExists =await userModel.findOne({email});//check if user already exists
    if(isUserAlreadyExists){
        return res.status(400).json({
            message : "user already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password,10);//hash password

    const user = await userModel.create({//create user
        fullName,
        email,
        password : hashedPassword,
    });

    const token = jwt.sign({
        id : user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token);//set cookie

    res.status(201).json({//send response
        message : "user registered successfully",
        user:{
            id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })
}

async function loginUser(req,res){//login user function
    const {email,password} = req.body;

    const user = await userModel.findOne({email});//find user by email

    if(!user){
        return res.status(400).json({
            message : "Invalid email and password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);//compare password

    if(!isPasswordValid){
        res.status(400).json({
            message : "Invalid email and password"
        })
    }
    
    const token = jwt.sign({
        _id : user._id,
    },process.env.JWT_SECRET)//generate token

    res.cookie("token", token);//set cookie

    res.status(200).json({//send response
        message : "User logged in successfully", 
        user:{
            _id : user._id,
            email : user.email,
            fullName : user.fullName
        }
        })

}

module.exports ={
    registerUser,
    loginUser
}
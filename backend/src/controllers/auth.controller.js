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
    },"7d99a04a17242ec52ff1584170a0d4fb")

    res.cookie("token", token);//set cookie

    res.status(200).json({//send response
        message : "user registered successfully",
        user:{
            id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })
}

module.exports ={
    registerUser,
}
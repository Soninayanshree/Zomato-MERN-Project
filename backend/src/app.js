//create server
const express = require("express");//import express
const cookieParser = require("cookie-parser");//import cookie parser
const authRoutes = require("./routes/auth.routes");//import auth routes

const app = express();//instanctiate express

app.use(cookieParser());//to parse cookies
app.use(express.json());//to accept json data

app.get("/",(req,res) => {
    res.send("hello nayan")
});

app.use("/api/auth",authRoutes);//use auth routes

module.exports = app;//export app
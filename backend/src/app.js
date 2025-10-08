//create server
const express = require("express");//import express
const cookieParser = require("cookie-parser");//import cookie parser
const authRoutes = require("./routes/auth.routes");//import auth routes
const foodRoutes = require("./routes/food.routes");//import food routes
const cors = require("cors");//import cors for cross origin resource sharing

const app = express();//instanctiate express

app.use(express.json());//to accept json data
app.use(cookieParser());//to parse cookies
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}));//to allow cross origin resource sharing

app.get("/",(req,res) => {
    res.send("hello nayan")
});

app.use("/api/auth",authRoutes);//use auth routes
app.use("/api/food",foodRoutes);//use food routes

module.exports = app;//export app
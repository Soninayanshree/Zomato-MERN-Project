const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/food-view")
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => {
        console.log("Error:" , err)
    })
}

module.exports = connectDB;
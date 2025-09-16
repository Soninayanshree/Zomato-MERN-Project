const foodModel = require("../models/food.model");

async function createFood(req,res){
    console.log(req.foodPartner);
    console.log(req.body);
    console.log(req.file); // Access the uploaded video file
    res.send("Food created successfully");
}

module.exports = {
    createFood
};
const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require('uuid');// Generate unique identifiers

async function createFood(req,res){
    // console.log(req.foodPartner);
    // console.log(req.body);
    // console.log(req.file); // Access the uploaded video file

    const fileUploadResult = await storageService.uploadFile(req.file.buffer , uuid());// Upload file to storage service

    // Create a new food item in the database
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "Food item created successfully",
        food: foodItem// Return the created food item
    });
}

async function getFoodItems(req, res) {
    const  foodItems = await foodModel.find({});// Fetch all food items from the database
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    });
}

module.exports = {
    createFood,
    getFoodItems
};
const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req,res){
    const foodPartnerId = req.params.id;
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPArtner = await foodModel.find({foodPartner:foodPartnerId})

    if(!foodPartner){
        return res.send(404).json({message:"Food partner not found"});
    }

    res.status(200).json({
        message:"food partner retrieve successfully",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPArtner
        }
    });
};

module.exports = {
    getFoodPartnerById
}
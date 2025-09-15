const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({//401 unauthorized access
            message : "Please login first"
        });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);//verify token
        const foodPartner =await foodPartnerModel.findById(decoded.id);//find food partner by id

        req.foodPartner = foodPartner;//attach food partner to request object
        next();

    }
    catch(err){
        return res.status(401).json({
            message : "Unauthorized"
        });
    }

}

module.exports = {
    authFoodPartnerMiddleware
};
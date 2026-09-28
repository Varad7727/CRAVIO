const mongoose = require("mongoose")
const foodPartnerModel=require("../models/foodpartner.model")
const foodModel = require("../models/food.model")

const getFoodPartnerById=async(req,res)=>{
    const foodPartnerId=req.params.id
    if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
        return res.status(404).json({
            message:"Food partner not found"
        })
    }

    const foodPartner=await foodPartnerModel
        .findById(foodPartnerId)
        .select("name contactName phone address email")
        .lean()

    if(!foodPartner){
        return res.status(404).json({
            message:"Food partner not found"
        })
    }

    const foodItems = await foodModel
        .find({ foodPartner: foodPartner._id })
        .select("name video description price category isAvailable createdAt")
        .sort({ createdAt: -1 })
        .lean()

     res.status(200).json({
        message: "Food Partner fetched successfully",
        foodPartner,
        foodItems
    })
}

module.exports={getFoodPartnerById}


//Normally, Mongoose returns a Mongoose document with additional Mongoose functionality.
//.lean() tells Mongoose:
//Just give me a normal JavaScript object.

// .select("name contactName phone address email")
// This tells MongoDB:
// I only want these fields.
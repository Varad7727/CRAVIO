const foodModel = require("../models/food.model");
const foodPartnerModel = require("../models/foodpartner.model");
const mongoose = require("mongoose");
const storageService = require("../service/storage.service");
const { v4: uuid } = require("uuid");

// CREATE FOOD
const createFood = async (req, res) => {
    console.log(req.foodpartner);
    console.log(req.body);
    console.log(req.file);

    // Upload video
    const fileUploadResult = await storageService.uploadFile(
        req.file.buffer,
        uuid()
    );

    console.log(fileUploadResult);

    // Create food item
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        price: req.body.price,
        category: req.body.category,
        isAvailable: req.body.isAvailable ?? true,
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({
        message: "Food Item Created Successfully",
        status: "Successful",
        food: foodItem
    });
};


// GET ALL FOOD ITEMS
const getFoodItems = async (req, res) => {

    const foodItems = await foodModel
        .find({})
        .populate(
            "foodPartner",
            "name contactName address phone email"
        );

    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    });
};


// GET MENU BY FOOD PARTNER
const foodItemsMenuByPartner = async (req, res) => {

    // Get food partner ID from URL
    const foodPartnerId = req.params.id;

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
        return res.status(404).json({
            message: "Partner Doesnt Exist!!",
            status: "failed"
        });
    }

    // Check whether partner exists
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);

    if (!foodPartner) {
        return res.status(404).json({
            message: "Food partner not found"
        });
    }

    // Get menu items of this partner
    const menu = await foodModel
        .find({
            foodPartner: foodPartnerId
        })
        .select(
            "name description price category rating isAvailable"
        );

    return res.status(200).json({
        message: "Menu fetched successfully",
        menu
    });
};


module.exports = {
    createFood,
    getFoodItems,
    foodItemsMenuByPartner
};
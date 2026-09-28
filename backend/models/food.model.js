const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    video: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    isAvailable: {
        type: Boolean,
        default: true,
    },

    foodPartner: {
        type: mongoose.Types.ObjectId,
        ref: "foodpartnermodel",
        required: true,
    }

}, { timestamps: true });

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
const express=require("express")
const foodPartnerController=require("../controller/foodPartner.controller")
const router=express.Router()

// /api/food-partner/:id
router.get("/:id",
    foodPartnerController.getFoodPartnerById
)
module.exports=router
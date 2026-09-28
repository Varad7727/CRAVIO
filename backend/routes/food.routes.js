const express=require("express")
const foodController=require("../controller/food.controller")
const authMiddleware=require("../middleware/auth.middleware")
const multer=require("multer")
const router=express.Router();

const upload=multer({
    storage:multer.memoryStorage(),
})
//post food
router.post("/",authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood  )

//GET /api/food/
router.get("/",authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)
//menu
///partner/:id/menu
router.get("/partner/:id/menu", foodController.foodItemsMenuByPartner);
module.exports=router

//upload.single("video")
//video isnt a keyword u just needd to keep same name at frontend and backend